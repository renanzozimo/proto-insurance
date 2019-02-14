<template>
  <div id="app">
    <!-- REGISTER -->
    <div class="s1-U__width--900px s1-U__pd16" style="margin: 0 auto;">
      <h1 class="md-display-1 s1-U__text-color--primary s1-U__mg--bt32">Cadastro de pacote</h1>
      <section class="s1-U__mg--bt32">
        <h2 class="s1-U__text-color--primary s1-U__fw--300 s1-U__mg--bt16">Geral</h2>
        <div class="s1-U__pd--lt16">
          <div class="s1-loc__md-field-wrapper s1-U__width--240px">
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
            <md-field>
              <label for="User-Company">Empresa</label>
              <md-select id="User-Company" name="User-Company" v-model="User.Form.Company">
                <md-option
                  v-for="company in Companies"
                  :key="'company' + company.Id"
                  :value="company.Id"
                >{{company.Name}}</md-option>
              </md-select>
            </md-field>
          </div>
        </div>
      </section>
      <section class="s1-U__mg--bt32">
        <h2 class="s1-U__text-color--primary s1-U__fw--300 s1-U__mg--bt16">Composição</h2>
        <div class="s1-U__pd--lt16 s1-U__pd--rt16">
          <div class="md-layout md-gutter">
            <md-card>
              <div></div>
            </md-card>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import { required, minLength } from "vuelidate/lib/validators";

import Users from "./data/Users.js";
import Companies from "./data/Companies.js";

import getListByProp from "./assets/utils/getListByProp.js";
import getNameById from "./assets/utils/getNameById.js";
import getObjByProp from "./assets/utils/getObjByProp.js";
import getPropById from "./assets/utils/getPropById.js";
import getPropByProp from "./assets/utils/getPropByProp.js";
import randomString from "./assets/utils/randomString.js";

export default {
  name: "App",
  data: () => ({
    Companies,
    User: {
      Form: {
        Id: null,
        Name: null,
        Company: null,
        Abbr: null
      },
      DefaultForm: {
        Id: null,
        Name: null,
        Company: null,
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
        Company: {
          required
        }
      }
    }
  }
};
</script>
