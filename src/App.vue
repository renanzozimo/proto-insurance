<template>
  <div id="app">
    <div class="s1-U__width--900px s1-U__pd16" style="margin: 0 auto;">
      <h1 class="md-display-1 s1-U__text-color--primary s1-U__mg--bt32">Pacotes</h1>
      <div class="s1-U__text-align--center" v-if="Package.Data.length === 0">
        <p class="md-body-2 s1-U__text-color--dark-2 s1-U__mg--bt4">Nenhum pacote criado</p>
        <md-button class="md-primary md-raised">
          <div class="s1-U__align-children--center s1-U__pd--rt8 s1-U__pd--lt4">
            <md-icon class="s1-U__mg--rt4">add</md-icon>
            <span>Criar Pacote</span>
          </div>
        </md-button>
      </div>
      <div class="s1-U__pd--lt20 s1-U__pd--rt20" v-else>
        <div class="md-layout md-gutter">
          <div class="md-layout md-gutter">
            <div
              class="md-layout-item md-xsmall-size-100 md-medium-size-50 md-size-33 s1-U__mg--bt20"
              v-for="pack in Package.Data"
              :key="'Package-' + pack.Id"
            >
              <md-card>
                <div class="s1-U__pd--lt16 s1-U__pd--rt16 s1-U__pd--tp16">
                  <h2 class="md-title s1-U__text-color--primary">{{pack.Name}}</h2>
                </div>
                <div class="s1-U__pd--lt16 s1-U__pd--rt16 s1-U__pd--bt16 s1-U__pd--tp8">
                  <ul
                    class="s1-U__mg0 s1-U__pd0 s1-U__pd--lt16 s1-U__text-color--dark-2"
                    :style="`min-height: ${Package.moreQty * 20}px`"
                  >
                    <li
                      v-for="service in getXItems(pack.Services, Package.moreQty).items"
                      :key="'Service-'+ service+'-Package-'+pack.Id"
                    >
                      <span>{{getNameById(Services, service)}}</span>
                    </li>
                    <li v-if="getXItems(pack.Services, Package.moreQty).rest.length > 0">
                      <span>
                        <span>+ {{getXItems(pack.Services, Package.moreQty).rest.length}}</span>
                        <md-tooltip md-direction="right">
                          <span
                            v-for="(rest, index) in getXItems(pack.Services, Package.moreQty).rest"
                            :key="rest"
                          >{{getNameById(Services, rest)}} {{ index === (getXItems(pack.Services, Package.moreQty).rest.length - 1) ? '' : ', ' }}</span>
                        </md-tooltip>
                      </span>
                    </li>
                  </ul>
                </div>
                <p class="s1-U__text-align--right s1-U__pd--rt16">
                  <span class="md-caption s1-U__text-color--dark-3">
                    <b>{{formatMoney(pack.ServicesCost)}}</b>
                    <md-tooltip md-direction="left">Custo fornecedor</md-tooltip>
                  </span>
                </p>
                <div
                  class="s1-U__align-children--center s1-U__pd--lt16 s1-U__pd--rt16 s1-U__pd--bt16"
                >
                  <div class="s1-U__full-width">
                    <md-button class="md-icon-button md-dense s1-md-bordered squared s1-U__mg--rt4">
                      <md-icon>launch</md-icon>
                      <md-tooltip md-direction="right">Gerar release</md-tooltip>
                    </md-button>
                    <md-button class="md-icon-button md-dense s1-md-bordered squared s1-U__mg--rt4">
                      <md-icon>list</md-icon>
                      <md-tooltip md-direction="right">Ver detalhes</md-tooltip>
                    </md-button>
                    <md-button class="md-icon-button md-dense s1-md-bordered squared">
                      <md-icon>edit</md-icon>
                      <md-tooltip md-direction="right">Editar</md-tooltip>
                    </md-button>
                  </div>
                  <p
                    class="md-title s1-U__text-color--accent s1-U__text-align--right s1-U__full-width"
                  >
                    <span>
                      {{formatMoney(pack.TotalCost)}}
                      <md-tooltip md-direction="left">Custo repassado</md-tooltip>
                    </span>
                  </p>
                </div>
              </md-card>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- REGISTER -->
    <div class="s1-U__width--900px s1-U__pd16" style="margin: 0 auto;">
      <h1 class="md-display-1 s1-U__text-color--primary s1-U__mg--bt32">Cadastro de pacote</h1>
      <section class="s1-U__mg--bt32">
        <h2 class="s1-U__text-color--primary s1-U__fw--300 s1-U__mg--bt16">Geral</h2>
        <div class="s1-U__pd--lt16">
          <div class="s1-loc__md-field-wrapper s1-U__width--240px">
            <md-field
              :class="{'md-invalid md-field-helper-text': $v.Package.Form.Name.$dirty && $v.Package.Form.Name.$invalid}"
            >
              <label for="Package-Name">Nome</label>
              <md-input
                id="Package-Name"
                name="Package-Name"
                type="text"
                @blur="$v.Package.Form.Name.$touch()"
                @focus="$v.Package.Form.Name.$reset()"
                v-model="Package.Form.Name"
                required
              ></md-input>
              <span class="md-error" v-if="!$v.Package.Form.Name.required">Campo obrigatório</span>
              <span class="md-error" v-if="!$v.Package.Form.Name.minLength">Mínimo de 4 caracteres</span>
            </md-field>
          </div>
          <div class="s1-loc__md-field-wrapper s1-U__width--180px">
            <md-field>
              <label for="Package-Company">Empresa</label>
              <md-select id="Package-Company" name="Package-Company" v-model="Package.Form.Company">
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
        <h2 class="s1-U__text-color--primary s1-U__fw--300 s1-U__mg--bt16">Serviços</h2>
        <div class="s1-U__pd--lt16 s1-U__pd--rt16">
          <div v-if="Package.Form.Services.length === 0">
            <p class="md-body-2 s1-U__text-color--dark-2 s1-U__mg--bt4">Nenhum serviço adicionado</p>
            <md-button class="md-primary md-raised">
              <div class="s1-U__align-children--center s1-U__pd--rt8 s1-U__pd--lt4">
                <md-icon class="s1-U__mg--rt4">add</md-icon>
                <span>Serviço</span>
              </div>
            </md-button>
          </div>
          <div class="md-layout md-gutter" v-else>
            <md-card>
              <div></div>
            </md-card>
          </div>
        </div>
      </section>
      <md-dialog
        class="s1-loc-comp__services-dialog"
        :md-close-on-esc="false"
        :md-click-outside-to-close="false"
        :md-active.sync="Package.ServicesDialog"
      >
        <div class="s1-U__pd16 s1-U__border--bottom1">
          <h2 class="md-title">Serviços</h2>
        </div>
        <div class="s1-U__full-height s1-U__align-children--center">
          <md-content
            class="md-scrollbar s1-U__full-height s1-U__full-width s1-U__pd0 s1-U__pd16"
            style="overflow: auto"
          ></md-content>
          <md-content
            class="md-scrollbar s1-U__full-height s1-U__full-width s1-U__pd0 s1-U__pd16"
            style="overflow: auto"
          >
            <p>{{LongText}}</p>
          </md-content>
        </div>
      </md-dialog>
    </div>
  </div>
</template>

<script>
import { required, minLength } from "vuelidate/lib/validators";

import LongText from "./data/LongText.js";

import Packages from "./data/Packages.js";
import Companies from "./data/Companies.js";
import Services from "./data/Services.js";
import Suppliers from "./data/Suppliers.js";
import ServiceTypes from "./data/ServiceTypes.js";

import formatMoney from "./assets/utils/formatMoney.js";
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
    Services,
    Suppliers,
    ServiceTypes,
    LongText,
    Package: {
      moreQty: 3,
      Form: {
        Id: null,
        Name: null,
        Services: [],
        FinalValue: null,
        TotalCost: null
      },
      DefaultForm: {
        Id: null,
        Name: null,
        Services: [],
        FinalValue: null,
        TotalCost: null
      },
      Data: Packages,
      MockData: Packages,
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
      },
      ServicesDialog: true
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
    formatMoney,
    getXItems(array, n) {
      if (array.length <= n) {
        return {
          items: array,
          rest: []
        };
      } else {
        return {
          items: array.filter((item, index) => {
            if (index < n - 1) return item;
          }),
          rest: array.filter((item, index) => {
            if (index >= n - 1) return item;
          })
        };
      }
    },
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
    Package: {
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
