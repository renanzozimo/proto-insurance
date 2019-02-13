<template>
  <div id="app">
    <div class="s1-prop__auto-gen">
      <md-button class="md-primary md-icon-button squared" @click="setMockData('User')">
        <md-icon>person</md-icon>
      </md-button>
    </div>
    <section class="s1-U__width--900px s1-U__pd32" style="margin: 0 auto;">
      <h1 class="md-display-1 s1-U__mg--bt32">Usuários</h1>
      <div class="s1-U__text-align--center s1-U__pd32" v-if="User.Data.length === 0">
        <p class="md-body-2 s1-U__mg--bt16 s1-U__text-color--dark-2">Nenhum usuário cadastrado</p>
        <md-button class="md-raised md-primary" @click="create('User', 'User-Name')">
          <div class="s1-U__align-children--center s1-U__pd--rt8 s1-U__pd--lt4">
            <md-icon class="s1-U__mg--rt4">add</md-icon>
            <span>usuário</span>
          </div>
        </md-button>
      </div>
      <div v-else>
        <div
          class="s1-U__align-children--center s1-U__mg--bt16 s1-U__justify-content--space-between"
        >
          <md-button class="s1-md-bordered s1-U__mg--bt16">
            <div class="s1-U__align-children--center">
              <md-icon>filter_list</md-icon>
              <span>filtros</span>
            </div>
          </md-button>
          <md-button
            class="md-raised md-primary s1-U__mg--bt16"
            @click="create('User', 'User-Name')"
          >
            <div class="s1-U__align-children--center">
              <md-icon>add</md-icon>
              <span>usuário</span>
            </div>
          </md-button>
        </div>
        <div class="md-layout md-gutter">
          <div
            class="md-layout-item md-size-50 s1-U__mg--bt20"
            v-for="user in User.Data"
            :key="user.Id"
          >
            <md-card>
              <div class="s1-U__pd16">
                <h2 class="md-title">{{user.Name}}</h2>
                <p class="md-caption">{{getNameById(Profiles, user.Profile)}}</p>
              </div>
              <div class="s1-U__text-align--right s1-U__pd16 s1-U__pd--tp0">
                <md-button
                  class="md-icon-button"
                  @click="remove('User', user.Id, 'Name', 'usuário')"
                >
                  <md-icon>delete</md-icon>
                </md-button>
                <md-button class="md-icon-button" @click="setEditingIndex('User', user.Id)">
                  <md-icon>edit</md-icon>
                </md-button>
              </div>
            </md-card>
          </div>
        </div>
      </div>

      <md-dialog
        class="s1-U__width--400px"
        :md-close-on-esc="false"
        :md-click-outside-to-close="false"
        :md-active.sync="User.CreationInterface"
        :class="User.DiscardCreationInterface && 's1-U__invisible'"
      >
        <div
          class="md-layout md-alignment-center-center s1-loc__loading"
          :class="User.Loading && 'active'"
        >
          <md-progress-spinner md-mode="indeterminate"></md-progress-spinner>
        </div>
        <div
          class="s1-U__border--bottom1 s1-U__pd16 s1-U__flex-shrink-0 s1-U__align-children--center s1-U__justify-content--space-between"
        >
          <div class="md-title">Novo usuário</div>
          <md-button class="md-icon-button" @click="User.DiscardCreationInterface = true">
            <md-icon>close</md-icon>
          </md-button>
        </div>
        <md-content class="md-scrollbar s1-U__pd0 s1-U__pd16" style="overflow: auto">
          <div class="s1-loc__md-field-wrapper s1-U__width--180px">
            <md-field
              :class="{'md-invalid md-field-helper-text': $v.User.Form.Name.$dirty && $v.User.Form.Name.$invalid}"
            >
              <label for="User-Name">Nome</label>
              <md-input
                id="User-Name"
                name="User-Name"
                type="text"
                @blur="$v.User.Form.Name.$touch()"
                @focus="$v.User.Form.Name.$reset()"
                v-model="User.Form.Name"
                required
              ></md-input>
              <span class="md-error" v-if="!$v.User.Form.Name.required">Campo obrigatório</span>
              <span class="md-error" v-if="!$v.User.Form.Name.minLength">Mínimo de 4 caracteres</span>
            </md-field>
          </div>
          <div class="s1-loc__md-field-wrapper s1-U__width--180px">
            <md-field
              :class="{'md-invalid' : $v.User.Form.Profile.$dirty && $v.User.Form.Profile.$invalid}"
            >
              <label for="User-Profile">Perfil</label>
              <md-select
                id="User-Profile"
                name="User-Profile"
                v-model="User.Form.Profile"
                @blur="$v.User.Form.Profile.$touch()"
                @focus="$v.User.Form.Profile.$reset()"
                required
              >
                <md-option
                  v-for="profile in Profiles"
                  :key="'profile' + profile.Id"
                  :value="profile.Id"
                >{{profile.Name}}</md-option>
              </md-select>
              <span class="md-error" v-if="!$v.User.Form.Profile.required">Campo obrigatório</span>
            </md-field>
          </div>
        </md-content>
        <md-dialog-actions class="s1-U__pd16 s1-U__border--top1 s1-U__flex-shrink-0">
          <md-button
            class="md-primary md-raised"
            :disabled="$v.User.Form.$invalid"
            @click="saveCreated('User')"
          >
            <span class="s1-U__pd--lt8 s1-U__pd--rt8">Cadastrar</span>
          </md-button>
        </md-dialog-actions>
      </md-dialog>

      <md-dialog
        class="s1-U__width--400px"
        :md-close-on-esc="false"
        :md-click-outside-to-close="false"
        :md-active.sync="User.EditionInterface"
        :class="User.DiscardEditionInterface && 's1-U__invisible'"
        v-if="User.Data.length > 0"
      >
        <div
          class="md-layout md-alignment-center-center s1-loc__loading"
          :class="User.Loading && 'active'"
        >
          <md-progress-spinner md-mode="indeterminate"></md-progress-spinner>
        </div>
        <div
          class="s1-U__border--bottom1 s1-U__pd16 s1-U__flex-shrink-0 s1-U__align-children--center s1-U__justify-content--space-between"
        >
          <div class="md-title">{{User.Data[User.EditingIndex].Name}}</div>
          <md-button class="md-icon-button" @click="User.DiscardEditionInterface = true">
            <md-icon>close</md-icon>
          </md-button>
        </div>
        <md-content class="md-scrollbar s1-U__pd0 s1-U__pd16" style="overflow: auto">
          <div class="s1-loc__md-field-wrapper s1-U__width--180px">
            <md-field
              :class="{'md-invalid md-field-helper-text': $v.User.Form.Name.$dirty && $v.User.Form.Name.$invalid}"
            >
              <label for="Edit-User-Name">Nome</label>
              <md-input
                id="Edit-User-Name"
                name="Edit-User-Name"
                type="text"
                @blur="$v.User.Form.Name.$touch()"
                @focus="$v.User.Form.Name.$reset()"
                v-model="User.Form.Name"
                required
              ></md-input>
              <span class="md-error" v-if="!$v.User.Form.Name.required">Campo obrigatório</span>
              <span class="md-error" v-if="!$v.User.Form.Name.minLength">Mínimo de 4 caracteres</span>
            </md-field>
          </div>
          <div class="s1-loc__md-field-wrapper s1-U__width--180px">
            <md-field
              :class="{'md-invalid' : $v.User.Form.Profile.$dirty && $v.User.Form.Profile.$invalid}"
            >
              <label for="Edit-User-Profile">Perfil</label>
              <md-select
                id="Edit-User-Profile"
                name="Edit-User-Profile"
                v-model="User.Form.Profile"
                @blur="$v.User.Form.Profile.$touch()"
                @focus="$v.User.Form.Profile.$reset()"
                required
              >
                <md-option
                  v-for="profile in Profiles"
                  :key="'profile' + profile.Id"
                  :value="profile.Id"
                >{{profile.Name}}</md-option>
              </md-select>
              <span class="md-error" v-if="!$v.User.Form.Profile.required">Campo obrigatório</span>
            </md-field>
          </div>
        </md-content>
        <md-dialog-actions class="s1-U__pd16 s1-U__border--top1 s1-U__flex-shrink-0">
          <md-button
            class="md-primary md-raised"
            :disabled="$v.User.Form.$invalid"
            @click="saveEdited('User')"
          >
            <span class="s1-U__pd--lt8 s1-U__pd--rt8">Cadastrar</span>
          </md-button>
        </md-dialog-actions>
      </md-dialog>

      <md-dialog-confirm
        :md-backdrop="false"
        :md-active.sync="User.DiscardCreationInterface"
        md-title="Descartar cadastro?"
        md-content="Ao sair, as informações do usuário em cadastro serão descartadas"
        md-confirm-text="descartar"
        md-cancel-text="voltar"
        @md-cancel="User.DiscardCreationInterface = false"
        @md-confirm="discardCreation('User')"
      />

      <md-dialog-confirm
        :md-backdrop="false"
        :md-active.sync="User.DiscardEditionInterface"
        md-title="Descartar edição?"
        md-content="Ao sair, as informações do usuário em edição serão descartadas"
        md-confirm-text="descartar"
        md-cancel-text="voltar"
        @md-cancel="User.DiscardEditionInterface = false"
        @md-confirm="discardEdit('User')"
      />

      <md-dialog-confirm
        :md-active.sync="User.DeleteConfirmation"
        :md-title="User.DeleteInfo.Title"
        :md-content="User.DeleteInfo.Content"
        md-confirm-text="excluir"
        md-cancel-text="voltar"
        @md-cancel="User.DeleteConfirmation = false"
        @md-confirm="removeItem('User', User.DeleteInfo.Id)"
      />
      <md-snackbar
        :md-duration="Settings.snackbarDuration"
        :md-active.sync="User.SuccessFeedbackCreation"
        md-persistent
      >
        <span>Usuário criado com sucesso</span>
        <md-button class="md-accent" @click="User.SuccessFeedbackCreation = false">OK</md-button>
      </md-snackbar>
      <md-snackbar
        :md-duration="Settings.snackbarDuration"
        :md-active.sync="User.SuccessFeedbackEdition"
        md-persistent
      >
        <span>Usuário editado com sucesso</span>
        <md-button class="md-accent" @click="User.SuccessFeedbackEdition = false">OK</md-button>
      </md-snackbar>
      <md-snackbar
        :md-duration="Settings.snackbarDuration"
        :md-active.sync="User.SuccessFeedbackDeletion"
        md-persistent
      >
        <span>Usuário deletado com sucesso</span>
        <md-button class="md-accent" @click="User.SuccessFeedbackDeletion = false">OK</md-button>
      </md-snackbar>
    </section>
  </div>
</template>

<script>
import { required, minLength } from "vuelidate/lib/validators";

import Users from "./data/Users.js";
import Profiles from "./data/Profiles.js";

import getListByProp from "./assets/utils/getListByProp.js";
import getNameById from "./assets/utils/getNameById.js";
import getObjByProp from "./assets/utils/getObjByProp.js";
import getPropById from "./assets/utils/getPropById.js";
import getPropByProp from "./assets/utils/getPropByProp.js";
import randomString from "./assets/utils/randomString.js";

export default {
  name: "App",
  data: () => ({
    Profiles,
    User: {
      Form: {
        Id: null,
        Name: null,
        Profile: null,
        Abbr: null
      },
      DefaultForm: {
        Id: null,
        Name: null,
        Profile: null,
        Abbr: null
      },
      Data: [],
      MockData: Users,
      Loading: false,
      EditingIndex: 0,
      EditionInterface: false,
      DiscardEditionInterface: false,
      SuccessFeedbackEdition: false,
      CreationInterface: false,
      DiscardCreationInterface: false,
      SuccessFeedbackCreation: false,
      DeleteConfirmation: false,
      SuccessFeedbackDeletion: false,
      DeleteInfo: {
        Id: null,
        Title: null,
        Content: null
      }
    },
    Settings: {
      snackbarDuration: 3000
    }
  }),
  methods: {
    getListByProp,
    getNameById,
    getObjByProp,
    getPropById,
    getPropByProp,
    setMockData(entityName) {
      this[entityName].Data = [
        ...this[entityName].Data,
        ...this[entityName].MockData
      ];
    },
    setEditingIndex(entityName, id) {
      this[entityName].EditingIndex = this[entityName].Data.indexOf(
        getObjByProp(this[entityName].Data, id, "Id")
      );
    },
    create(entityName, idToFocus = null) {
      this[entityName].Form = { ...this[entityName].DefaultForm };
      this[entityName].Form.Id = randomString(64, "#aA");

      this[entityName].CreationInterface = true;

      if (idToFocus) {
        setTimeout(() => {
          if (document.getElementById(idToFocus))
            document.getElementById(idToFocus).focus();
        }, 300);
      }
    },
    edit(entityName, id, idToFocus = null) {
      this[entityName].Form = {
        ...this[entityName].Data[this[entityName].EditingIndex]
      };
      this[entityName].EditionInterface = true;

      if (idToFocus) {
        setTimeout(() => {
          if (document.getElementById(idToFocus))
            document.getElementById(idToFocus).focus();
        }, 300);
      }
    },
    discardEdition(entityName) {
      this[entityName].Form = { ...this[entityName].DefaultForm };
      this[entityName].DiscardEditionInterface = false;
      this[entityName].EditionInterface = false;
      this.$v[entityName].Form.$reset();
    },
    discardCreation(entityName) {
      this[entityName].Form = { ...this[entityName].DefaultForm };
      this[entityName].DiscardCreationInterface = false;
      this[entityName].CreationInterface = false;
      this.$v[entityName].Form.$reset();
    },
    addNewItemAbove(array, item) {
      return [item, ...array];
    },
    addNewItemBelow(array, item) {
      return [...array, item];
    },
    remove(entityName, id, prop, label) {
      let name = getPropById(this[entityName].Data, id, prop);
      this[entityName].DeleteConfirmation = true;
      this[entityName].DeleteInfo = {
        Id: id,
        Title: `Excluir ${label} ${name}?`,
        Content: `Ao excluir ${name} será impossível reverter essa ação ou recuperar esses dados.`
      };
    },
    removeItem(entityName, id) {
      this[entityName].Data = this[entityName].Data.filter(
        item => item.Id !== id
      );
      this[entityName].SuccessFeedbackDeletion = true;
      this.$forceUpdate();
    },
    saveCreated(entityName, end = false) {
      this[entityName].Loading = true;
      let self = this;

      setTimeout(() => {
        self[entityName].Data = !end
          ? self.addNewItemAbove(self[entityName].Data, {
              ...this[entityName].Form
            })
          : self.addNewItemBelow(self[entityName].Data, {
              ...this[entityName].Form
            });
      }, 1000);

      setTimeout(() => {
        self[entityName].Loading = false;
        self[entityName].CreationInterface = false;
        self[entityName].SuccessFeedbackCreation = true;
        self.$v[entityName].Form.$reset();
        self.$forceUpdate();
      }, 1200);
    },
    saveEdited(entityName) {
      this[entityName].Loading = true;
      let self = this;

      setTimeout(() => {
        self[entityName].Data[self[entityName].EditingIndex] = {
          ...this[entityName].Form
        };
      }, 1000);

      setTimeout(() => {
        self[entityName].Loading = false;
        self[entityName].EditionInterface = false;
        self[entityName].SuccessFeedbackEdition = true;
        self.$v[entityName].Form.$reset();
        self.$forceUpdate();
      }, 1200);
    }
  },
  validations: {
    User: {
      Form: {
        Name: {
          required,
          minLength: minLength(4)
        },
        Profile: {
          required
        }
      }
    }
  }
};
</script>
