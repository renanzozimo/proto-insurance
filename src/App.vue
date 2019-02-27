<template>
  <div
    id="app"
    :class="{'s1-loc-comp__mezzanine-is-active' : Package.ShowServiceDetails && !Package.ServicesDialog}"
  >
    <div v-show="Settings.activePage === 'allServices'">
      <section class="s1-U__width--900px s1-U__pd32" style="margin: 0 auto;">
        <h1 class="md-display-1 s1-U__mg--bt32">Usuários</h1>
        <div class="s1-U__text-align--center s1-U__pd32" v-if="Service.Data.length === 0">
          <p class="md-body-2 s1-U__mg--bt16 s1-U__text-color--dark-2">Nenhum serviço cadastrado</p>
          <md-button class="md-raised md-primary" @click="create('Service', 'Service-Name')">
            <div class="s1-U__align-children--center s1-U__pd--rt8 s1-U__pd--lt4">
              <md-icon class="s1-U__mg--rt4">add</md-icon>
              <span>serviço</span>
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
              @click="create('Service', 'Service-Name')"
            >
              <div class="s1-U__align-children--center">
                <md-icon>add</md-icon>
                <span>serviço</span>
              </div>
            </md-button>
          </div>
          <div class="md-layout md-gutter">
            <div
              class="md-layout-item md-size-50 s1-U__mg--bt20"
              v-for="service in Service.Data"
              :key="service.Id"
            >
              <md-card>
                <div class="s1-U__pd16">
                  <h2 class="md-title">{{service.FriendlyName}}</h2>
                </div>
                <div class="s1-U__text-align--right s1-U__pd16 s1-U__pd--tp0">
                  <md-button
                    class="md-icon-button"
                    @click="remove('Service', service.Id, 'Name', 'serviço')"
                  >
                    <md-icon>delete</md-icon>
                  </md-button>
                  <md-button class="md-icon-button" @click="edit('Service', service.Id)">
                    <md-icon>edit</md-icon>
                  </md-button>
                </div>
              </md-card>
            </div>
          </div>
        </div>

        <md-dialog
          :md-close-on-esc="false"
          :md-click-outside-to-close="false"
          :md-active.sync="Service.CreationInterface"
          :class="Service.DiscardCreationInterface && 's1-U__invisible'"
        >
          <div
            class="md-layout md-alignment-center-center s1-loc__loading"
            :class="Service.Loading && 'active'"
          >
            <md-progress-spinner md-mode="indeterminate"></md-progress-spinner>
          </div>
          <div
            class="s1-U__border--bottom1 s1-U__pd16 s1-U__flex-shrink-0 s1-U__align-children--center s1-U__justify-content--space-between"
          >
            <div class="md-title">Novo serviço</div>
            <md-button class="md-icon-button" @click="Service.DiscardCreationInterface = true">
              <md-icon>close</md-icon>
            </md-button>
          </div>
          <md-content class="md-scrollbar s1-U__pd0 s1-U__pd16" style="overflow: auto">
            <div class="s1-loc__md-field-wrapper s1-U__width--210px">
              <md-field
                :md-counter="false"
                :class="{'md-invalid md-field-helper-text': $v.Service.Form.Name.$dirty && $v.Service.Form.Name.$invalid}"
              >
                <label for="Service-Name">Nome</label>
                <md-input
                  id="Service-Name"
                  name="Service-Name"
                  type="text"
                  @blur="$v.Service.Form.Name.$touch()"
                  @focus="$v.Service.Form.Name.$reset()"
                  v-model="Service.Form.Name"
                  maxlength="20"
                  required
                ></md-input>
                <span class="md-error" v-if="!$v.Service.Form.Name.required">Obrigatório</span>
              </md-field>
            </div>
            <div class="s1-loc__md-field-wrapper s1-U__width--210px">
              <md-field
                :md-counter="false"
                :class="{'md-invalid md-field-helper-text': $v.Service.Form.FriendlyName.$dirty && $v.Service.Form.FriendlyName.$invalid}"
              >
                <label for="Service-FriendlyName">Nome camarada</label>
                <md-input
                  id="Service-FriendlyName"
                  name="Service-FriendlyName"
                  type="text"
                  @blur="$v.Service.Form.FriendlyName.$touch()"
                  @focus="$v.Service.Form.FriendlyName.$reset()"
                  v-model="Service.Form.FriendlyName"
                  maxlength="20"
                  required
                ></md-input>
                <span class="md-error" v-if="!$v.Service.Form.FriendlyName.required">Obrigatório</span>
              </md-field>
            </div>
            <div class="s1-loc__md-field-wrapper s1-U__width--180px">
              <md-field
                :class="{'md-invalid md-field-helper-text': $v.Service.Form.Supplier.$dirty && $v.Service.Form.Supplier.$invalid}"
              >
                <label for="Service-Supplier">Fornecedor</label>
                <md-select
                  id="Service-Supplier"
                  name="Service-Supplier"
                  @blur="$v.Service.Form.Supplier.$touch()"
                  @focus="$v.Service.Form.Supplier.$reset()"
                  v-model="Service.Form.Supplier"
                  required
                >
                  <md-option
                    v-for="supplier in Suppliers"
                    :key="'supplier' + supplier.Id"
                    :value="supplier.Id"
                  >{{supplier.Name}}</md-option>
                </md-select>
                <span class="md-error" v-if="!$v.Service.Form.Supplier.required">Obrigatório</span>
              </md-field>
            </div>
            <div class="s1-loc__md-field-wrapper s1-U__width--144px">
              <md-field
                :class="{'md-invalid md-field-helper-text': $v.Service.Form.Type.$dirty && $v.Service.Form.Type.$invalid}"
              >
                <label for="Service-Type">Tipo</label>
                <md-select
                  id="Service-Type"
                  name="Service-Type"
                  @blur="$v.Service.Form.Type.$touch()"
                  @focus="$v.Service.Form.Type.$reset()"
                  v-model="Service.Form.Type"
                  required
                >
                  <md-option
                    v-for="serviceType in ServiceTypes"
                    :key="'serviceType' + serviceType.Id"
                    :value="serviceType.Id"
                  >{{serviceType.Name}}</md-option>
                </md-select>
                <span class="md-error" v-if="!$v.Service.Form.Type.required">Obrigatório</span>
              </md-field>
            </div>
            <div class="s1-loc__md-field-wrapper">
              <md-field>
                <label for="Service-Description">Descrição</label>
                <md-textarea
                  id="Service-Description"
                  name="Service-Description"
                  v-model="Service.Form.Description"
                  md-autogrow
                ></md-textarea>
              </md-field>
            </div>
            <div class="s1-loc__md-field-wrapper s1-U__width--180px">
              <md-field>
                <label for="Service-CurrencyCode">Moeda</label>
                <md-select
                  id="Service-CurrencyCode"
                  name="Service-CurrencyCode"
                  v-model="Service.Form.CurrencyCode"
                  required
                >
                  <md-option
                    v-for="currency in Currencies"
                    :key="'currency' + currency.Id"
                    :value="currency.Id"
                  >{{currency.Name}}</md-option>
                </md-select>
              </md-field>
            </div>
            <div class="s1-loc__md-field-wrapper s1-U__width--100px">
              <md-field
                :class="{'md-invalid md-field-helper-text': $v.Service.Form.Cost.$dirty && $v.Service.Form.Cost.$invalid}"
              >
                <label for="Service-Cost">Custo</label>
                <md-input
                  id="Service-Cost"
                  name="Service-Cost"
                  type="number"
                  @blur="$v.Service.Form.Cost.$touch()"
                  @focus="$v.Service.Form.Cost.$reset()"
                  v-model="Service.Form.Cost"
                  required
                ></md-input>
                <span class="md-error" v-if="!$v.Service.Form.Cost.required">Obrigatório</span>
              </md-field>
            </div>
            <div class="s1-loc__md-field-wrapper">
              <div class="s1-U__text-color--dark-2 s1-U__mg--bt8">Vigência</div>
              <div class="s1-U__align-children--bottom s1-U__mg--bt16">
                <md-field
                  class="s1-md-field--w50px s1-U__mg0"
                  :class="{'md-invalid md-field-helper-text': $v.Service.Form.Vigence.$dirty && $v.Service.Form.Vigence.$invalid}"
                >
                  <md-input
                    class="s1-U__text-align--center"
                    id="Service-Vigence"
                    name="Service-Vigence"
                    type="number"
                    @blur="$v.Service.Form.Vigence.$touch()"
                    @focus="$v.Service.Form.Vigence.$reset()"
                    v-model="Service.Form.Vigence"
                    required
                  ></md-input>
                </md-field>
                <p class="s1-U__mg--lt8">dias</p>
              </div>
            </div>
            <h3
              class="md-title s1-U__text-color--primary s1-U__fw--300 s1-U__mg--bt16 s1-U__mg--tp32"
            >Favorecidos</h3>
            <div class="s1-U__pd--lt16 s1-U__pd--rt16">
              <table style="border-spacing: 0">
                <tbody>
                  <tr v-for="(fav, index) in Service.Form.Rules" :key="fav.Appliedto + '-in-form'">
                    <td class="s1-U__pd--rt8">
                      <p
                        class="md-body-2 s1-U__flex-shrink-0 s1-U__text-color--dark-2 s1-U__text-align--right"
                      >{{fav.Appliedto}}:</p>
                    </td>
                    <td
                      class="s1-U__pd--rt8 s1-U__pd--bt8 s1-U__pd--tp8"
                      v-show="Service.FormFavoredVisibility[fav.Appliedto]"
                    >
                      <md-field class="s1-md-field--w150px s1-U__mg0">
                        <md-select
                          id="Service-CurrencyCode"
                          name="Service-CurrencyCode"
                          v-model="Service.Form.Rules[index].Operator"
                          required
                        >
                          <md-option
                            v-for="operator in Operators"
                            :key="'operator' + operator.Id"
                            :value="operator.Id"
                          >{{operator.Name}}</md-option>
                        </md-select>
                      </md-field>
                    </td>
                    <td
                      class="s1-U__pd--rt8 s1-U__pd--bt8 s1-U__pd--tp8"
                      v-show="Service.FormFavoredVisibility[fav.Appliedto]"
                    >
                      <md-field class="s1-md-field--w50px s1-U__mg0">
                        <md-input
                          class="s1-U__text-align--center"
                          id="Service-Value"
                          name="Service-Value"
                          type="number"
                          v-model="Service.Form.Rules[index].Value"
                          @change="(!Service.Form.Rules[index].Value || Service.Form.Rules[index].Value === '0') && Service.FormFavoredVisibility[fav.Appliedto] ? Service.Form.Rules[index].Value = '1' : null"
                          required
                        ></md-input>
                      </md-field>
                    </td>
                    <td colspan="2" v-show="!Service.FormFavoredVisibility[fav.Appliedto]">
                      <div class="s1-U__align-children--center">
                        <span
                          class="s1-U__text-color--dark-2 s1-U__pd--rt16 s1-U__flex-shrink-0"
                        >nenhum</span>
                        <md-button
                          class="md-dense s1-U__mg--bt4 md-primary s1-md-bordered"
                          @click="Service.FormFavoredVisibility[fav.Appliedto] ? Service.Form.Rules[index].Value = '0' : Service.Form.Rules[index].Value = '1'; Service.FormFavoredVisibility[fav.Appliedto] ? Service.Form.Rules[index].Operator = '=' : null; Service.FormFavoredVisibility[fav.Appliedto] = !Service.FormFavoredVisibility[fav.Appliedto]"
                        >
                          <div class="s1-U__align-children--center">
                            <md-icon>{{Service.FormFavoredVisibility[fav.Appliedto] ? 'close' : 'add'}}</md-icon>
                            <span class="s1-U__mg--lt4">Adicionar</span>
                          </div>
                        </md-button>
                      </div>
                    </td>
                    <td class v-show="Service.FormFavoredVisibility[fav.Appliedto]">
                      <md-button
                        class="md-dense s1-U__mg--bt4 md-icon-button"
                        @click="Service.FormFavoredVisibility[fav.Appliedto] ? Service.Form.Rules[index].Value = '0' : Service.Form.Rules[index].Value = '1'; Service.FormFavoredVisibility[fav.Appliedto] ? Service.Form.Rules[index].Operator = '=' : null; Service.FormFavoredVisibility[fav.Appliedto] = !Service.FormFavoredVisibility[fav.Appliedto]"
                        v-if="fav.Appliedto !== 'Titular'"
                      >
                        <md-icon>{{Service.FormFavoredVisibility[fav.Appliedto] ? 'close' : 'add'}}</md-icon>
                      </md-button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <h3
              class="md-title s1-U__text-color--primary s1-U__fw--300 s1-U__mg--bt16 s1-U__mg--tp32"
            >Campos</h3>
            <div class="service-fields s1-U__pd--lt16 s1-U__pd--rt16">
              <h4 class="s1-U__text-color--dark-2 md-body-2">Titular</h4>
              <div class="s1-chip-wrapper--left s1-U__mg--bt16">
                <md-chip class="md-primary">Nome</md-chip>
                <md-chip class="md-primary">Documento</md-chip>
                <md-chip class="md-primary">Tipo de documento</md-chip>
                <md-chip class="md-primary" md-deletable>Data de nascimento</md-chip>
                <md-chip class="md-primary" md-deletable>Endereço 1</md-chip>
                <md-chip class="md-primary" md-deletable>Endereço 2</md-chip>
                <md-chip class="md-primary" md-deletable>Endereço 3</md-chip>
                <md-chip class="md-primary" md-deletable>Telefone</md-chip>
                <md-chip class="md-primary" md-deletable>E-mail</md-chip>
                <md-chip class="md-primary" md-deletable>Facebook</md-chip>
                <md-chip class="md-primary" md-deletable>Horário preferencial de contato</md-chip>
                <md-button class="md-primary s1-md-bordered md-dense s1-U__mg--tp4">
                  <div class="s1-U__align-children--center">
                    <md-icon>add</md-icon>
                    <span class="s1-U__mg--lt4 s1-U__mg--rt8">adicionar</span>
                  </div>
                </md-button>
              </div>
              <h4 class="s1-U__text-color--dark-2 md-body-2">Dependente</h4>
              <div class="s1-chip-wrapper--left">
                <md-chip class="md-primary">Nome</md-chip>
                <md-chip class="md-primary">Documento</md-chip>
                <md-chip class="md-primary">Tipo de documento</md-chip>
                <md-chip class="md-primary" md-deletable>Data de nascimento</md-chip>
                <md-chip class="md-primary" md-deletable>Telefone</md-chip>
                <md-chip class="md-primary" md-deletable>E-mail</md-chip>
                <md-button class="md-primary s1-md-bordered md-dense s1-U__mg--tp4">
                  <div class="s1-U__align-children--center">
                    <md-icon>add</md-icon>
                    <span class="s1-U__mg--lt4 s1-U__mg--rt8">adicionar</span>
                  </div>
                </md-button>
              </div>
            </div>
          </md-content>
          <md-dialog-actions class="s1-U__pd16 s1-U__border--top1 s1-U__flex-shrink-0">
            <md-button
              class="md-primary md-raised"
              :disabled="$v.Service.Form.$invalid"
              @click="saveCreated('Service')"
            >
              <span class="s1-U__pd--lt8 s1-U__pd--rt8">Cadastrar</span>
            </md-button>
          </md-dialog-actions>
        </md-dialog>

        <md-dialog
          class="s1-U__width--400px"
          :md-close-on-esc="false"
          :md-click-outside-to-close="false"
          :md-active.sync="Service.EditionInterface"
          :class="Service.DiscardEditionInterface && 's1-U__invisible'"
          v-if="Service.Data.length > 0"
        >
          <div
            class="md-layout md-alignment-center-center s1-loc__loading"
            :class="Service.Loading && 'active'"
          >
            <md-progress-spinner md-mode="indeterminate"></md-progress-spinner>
          </div>
          <div
            class="s1-U__border--bottom1 s1-U__pd16 s1-U__flex-shrink-0 s1-U__align-children--center s1-U__justify-content--space-between"
          >
            <div class="md-title">{{Service.Data[Service.EditingIndex].Name}}</div>
            <md-button class="md-icon-button" @click="Service.DiscardEditionInterface = true">
              <md-icon>close</md-icon>
            </md-button>
          </div>
          <md-content class="md-scrollbar s1-U__pd0 s1-U__pd16" style="overflow: auto">
            <div class="s1-loc__md-field-wrapper s1-U__width--180px">
              <md-field
                :class="{'md-invalid md-field-helper-text': $v.Service.Form.Name.$dirty && $v.Service.Form.Name.$invalid}"
              >
                <label for="Edit-Service-Name">Nome</label>
                <md-input
                  id="Edit-Service-Name"
                  name="Edit-Service-Name"
                  type="text"
                  @blur="$v.Service.Form.Name.$touch()"
                  @focus="$v.Service.Form.Name.$reset()"
                  v-model="Service.Form.Name"
                  required
                ></md-input>
                <span class="md-error" v-if="!$v.Service.Form.Name.required">Obrigatório</span>
                <span class="md-error" v-if="!$v.Service.Form.Name.minLength">Mínimo de 4 caracteres</span>
              </md-field>
            </div>
          </md-content>
          <md-dialog-actions class="s1-U__pd16 s1-U__border--top1 s1-U__flex-shrink-0">
            <md-button
              class="md-primary md-raised"
              :disabled="$v.Service.Form.$invalid"
              @click="saveEdited('Service')"
            >
              <span class="s1-U__pd--lt8 s1-U__pd--rt8">Cadastrar</span>
            </md-button>
          </md-dialog-actions>
        </md-dialog>

        <md-dialog-confirm
          :md-backdrop="false"
          :md-active.sync="Service.DiscardCreationInterface"
          md-title="Descartar cadastro?"
          md-content="Ao sair, as informações do serviço em cadastro serão descartadas"
          md-confirm-text="descartar"
          md-cancel-text="voltar"
          @md-cancel="Service.DiscardCreationInterface = false"
          @md-confirm="discardCreation('Service')"
        />

        <md-dialog-confirm
          :md-backdrop="false"
          :md-active.sync="Service.DiscardEditionInterface"
          md-title="Descartar edição?"
          md-content="Ao sair, as informações do serviço em edição serão descartadas"
          md-confirm-text="descartar"
          md-cancel-text="voltar"
          @md-cancel="Service.DiscardEditionInterface = false"
          @md-confirm="discardEdition('Service')"
        />

        <md-dialog-confirm
          :md-active.sync="Service.DeleteConfirmation"
          :md-title="Service.DeleteInfo.Title"
          :md-content="Service.DeleteInfo.Content"
          md-confirm-text="excluir"
          md-cancel-text="voltar"
          @md-cancel="Service.DeleteConfirmation = false"
          @md-confirm="removeItem('Service', Service.DeleteInfo.Id)"
        />
        <md-snackbar
          :md-duration="Settings.snackbarDuration"
          :md-active.sync="Service.SuccessFeedbackCreation"
          md-persistent
        >
          <span>Usuário criado com sucesso</span>
          <md-button class="md-accent" @click="Service.SuccessFeedbackCreation = false">OK</md-button>
        </md-snackbar>
        <md-snackbar
          :md-duration="Settings.snackbarDuration"
          :md-active.sync="Service.SuccessFeedbackEdition"
          md-persistent
        >
          <span>Usuário editado com sucesso</span>
          <md-button class="md-accent" @click="Service.SuccessFeedbackEdition = false">OK</md-button>
        </md-snackbar>
        <md-snackbar
          :md-duration="Settings.snackbarDuration"
          :md-active.sync="Service.SuccessFeedbackDeletion"
          md-persistent
        >
          <span>Usuário deletado com sucesso</span>
          <md-button class="md-accent" @click="Service.SuccessFeedbackDeletion = false">OK</md-button>
        </md-snackbar>
      </section>
    </div>
    <div v-show="Settings.activePage === 'allPackages'">
      <div
        class="s1-U__width--900px s1-U__pd16"
        style="margin: 0 auto;"
        v-show="!Package.CreationInterface && !Package.EditionInterface"
      >
        <div class="md-layout md-alignment-center-space-between s1-U__full-width s1-U__mg--bt32">
          <div class="md-layout-item">
            <div class="md-display-1 s1-U__text-color--dark-2 s1-U__align-children--center">
              <md-button class="md-dense md-icon-button s1-U__mg--rt16 s1-U__mg--tp16">
                <md-icon>arrow_back</md-icon>
              </md-button>
              <div>
                <p class="md-caption">
                  <span class="s1-U__text-uppercase">RZ Corporation</span>
                  <span class="s1-U__mg--lt4 s1-U__mg--rt4">/</span>
                  <span class="s1-U__text-uppercase">Conta 2</span>
                </p>
                <h1 class="md-display-1 s1-U__text-color--dark-2 s1-U__align-children--center">
                  <span>Pacotes</span>
                </h1>
              </div>
            </div>
          </div>
          <div class="md-layout-item s1-U__text-align--right" v-if="Package.Data.length > 0">
            <md-button class="md-primary md-raised" @click="create('Package', 'Package-Name')">
              <div class="s1-U__align-children--center s1-U__pd--rt8 s1-U__pd--lt4">
                <md-icon class="s1-U__mg--rt4">add</md-icon>
                <span>Criar Pacote</span>
              </div>
            </md-button>
          </div>
        </div>
        <div class="s1-U__text-align--center" v-if="Package.Data.length === 0">
          <p class="md-body-2 s1-U__text-color--dark-2 s1-U__mg--bt4">Nenhum pacote criado</p>
          <md-button class="md-primary md-raised" @click="create('Package', 'Package-Name')">
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
                        <span>{{getPropById(Services, service, 'FriendlyName')}}</span>
                      </li>
                      <li v-if="getXItems(pack.Services, Package.moreQty).rest.length > 0">
                        <span>
                          <span>+ {{getXItems(pack.Services, Package.moreQty).rest.length}}</span>
                          <md-tooltip md-direction="right">
                            <span
                              v-for="(rest, index) in getXItems(pack.Services, Package.moreQty).rest"
                              :key="rest"
                            >{{getPropById(Services, rest, 'FriendlyName')}} {{ index === (getXItems(pack.Services, Package.moreQty).rest.length - 1) ? '' : ', ' }}</span>
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
                      <md-button
                        class="md-icon-button md-dense s1-md-bordered squared s1-U__mg--rt4"
                      >
                        <md-icon>launch</md-icon>
                        <md-tooltip md-direction="right">Gerar release</md-tooltip>
                      </md-button>
                      <md-button
                        class="md-icon-button md-dense s1-md-bordered squared s1-U__mg--rt4"
                      >
                        <md-icon>list</md-icon>
                        <md-tooltip md-direction="right">Ver detalhes</md-tooltip>
                      </md-button>
                      <md-button
                        class="md-icon-button md-dense s1-md-bordered squared"
                        @click="edit('Package', pack.Id, 'Package-edit-Name')"
                      >
                        <md-icon>edit</md-icon>
                        <md-tooltip md-direction="right">Editar</md-tooltip>
                      </md-button>
                    </div>
                    <p
                      class="md-title s1-U__text-color--accent s1-U__text-align--right s1-U__full-width"
                    >
                      <span>
                        {{formatMoney(pack.Price)}}
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
      <div
        class="s1-U__width--900px s1-U__pd16"
        style="margin: 0 auto; position: relative;"
        v-show="Package.CreationInterface"
      >
        <div
          class="md-layout md-alignment-center-center s1-loc__loading"
          :class="Package.Loading && 'active'"
        >
          <md-progress-spinner md-mode="indeterminate"></md-progress-spinner>
        </div>
        <div class="s1-U__mg--bt32">
          <div class="md-layout-item">
            <div class="md-display-1 s1-U__text-color--dark-2 s1-U__align-children--center">
              <md-button
                class="md-dense md-icon-button s1-U__mg--rt16 s1-U__mg--tp16"
                @click="Package.DiscardCreationInterface = true"
              >
                <md-icon>arrow_back</md-icon>
              </md-button>
              <div>
                <p class="md-caption">
                  <span class="s1-U__text-uppercase">RZ Corporation</span>
                  <span class="s1-U__mg--lt4 s1-U__mg--rt4">/</span>
                  <span class="s1-U__text-uppercase">Conta 2</span>
                </p>
                <h1 class="md-display-1 s1-U__text-color--dark-2 s1-U__align-children--center">
                  <span>Criação de pacote</span>
                </h1>
              </div>
            </div>
          </div>
          <!-- <h1 class="md-display-1 s1-U__text-color--dark-2 s1-U__align-children--center">
          <md-button
            class="md-dense md-icon-button s1-U__mg--rt16"
            @click="Package.DiscardCreationInterface = true"
          >
            <md-icon>arrow_back</md-icon>
          </md-button>
          <span>Cadastro de pacote</span>
          </h1>-->
        </div>
        <md-card>
          <md-card-content>
            <section class="s1-U__mg--bt32">
              <h3
                class="md-title s1-U__text-color--primary s1-U__fw--300 s1-U__mg--bt16 s1-U__mg--tp4"
              >Geral</h3>
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
                    <span class="md-error" v-if="!$v.Package.Form.Name.required">Obrigatório</span>
                    <span
                      class="md-error"
                      v-if="!$v.Package.Form.Name.minLength"
                    >Mínimo de 4 caracteres</span>
                  </md-field>
                </div>
                <div class="s1-loc__md-field-wrapper s1-U__width--180px">
                  <md-field
                    :class="{'md-invalid md-field-helper-text': $v.Package.Form.TenantId.$dirty && $v.Package.Form.TenantId.$invalid}"
                  >
                    <label for="Package-TenantId">Conta</label>
                    <md-select
                      id="Package-TenantId"
                      name="Package-TenantId"
                      v-model="Package.Form.TenantId"
                      @blur="$v.Package.Form.TenantId.$touch()"
                      @focus="$v.Package.Form.TenantId.$reset()"
                    >
                      <md-option
                        v-for="account in Accounts"
                        :key="'account' + account.Id"
                        :value="account.Id"
                      >{{account.Name}}</md-option>
                    </md-select>
                    <span class="md-error" v-if="!$v.Package.Form.TenantId.required">Obrigatório</span>
                  </md-field>
                </div>
              </div>
            </section>
            <section class="s1-U__mg--bt64">
              <h3 class="md-title s1-U__text-color--primary s1-U__fw--300 s1-U__mg--bt16">Serviços</h3>
              <div class="s1-U__pd--lt16 s1-U__pd--rt16">
                <div v-if="Package.Form.Services.length === 0">
                  <p
                    class="md-body-2 s1-U__text-color--dark-2 s1-U__mg--bt8"
                  >Nenhum serviço adicionado</p>
                  <md-button
                    class="md-primary s1-md-bordered"
                    @click="Package.ServicesDialog = true; closeAndClearDetails()"
                  >
                    <div class="s1-U__align-children--center s1-U__pd--rt8 s1-U__pd--lt4">
                      <md-icon class="s1-U__mg--rt4">add</md-icon>
                      <span>Serviço</span>
                    </div>
                  </md-button>
                  <p class="s1-U__text-color--dark-2 md-caption s1-U__mg--tp8">
                    É necessário pelo menos
                    <b>um</b> serviço para a criação do pacote.
                  </p>
                </div>
                <div v-else>
                  <div class="s1-U__width--400px">
                    <div
                      class="s1-U__align-children--center s1-U__justify-content--space-between s1-U__mg--bt4"
                      v-for="service in Package.Form.Services"
                      :key="service + '-service-in-list'"
                    >
                      <span
                        class="s1-U__width--210px s1-U__text-ellipsis"
                      >{{getPropById(Services, service, 'FriendlyName')}}</span>
                      <div class="s1-U__align-children--center">
                        <span
                          class="md-body-2 s1-U__text-color--accent s1-U__mg--rt8 s1-U__flex-shrink-0"
                        >{{formatMoney(getPropById(Services, service, 'Cost'))}}</span>
                        <md-button
                          class="md-dense s1-md-bordered s1-U__flex-shrink-0"
                          @click="setShowServiceDetail(getObjByProp(Services, service, 'Id'))"
                        >{{getPropById(Services, service, "Id") === Package.DetailedService.Id ? 'fechar detalhes' : 'ver detalhes'}}</md-button>
                      </div>
                    </div>
                  </div>
                  <md-button
                    class="md-primary s1-md-bordered s1-U__mg--tp16"
                    @click="Package.ServicesDialog = true; closeAndClearDetails()"
                  >adicionar / remover serviços</md-button>
                </div>
              </div>
            </section>
            <section class="s1-U__mg--bt64">
              <h3
                class="md-title s1-U__text-color--primary s1-U__fw--300 s1-U__mg--bt16"
              >Valor do pacote</h3>

              <div class="s1-U__pd--lt16">
                <div class="s1-loc__md-field-wrapper s1-U__width--130px">
                  <md-field
                    :class="{'md-invalid md-field-helper-text': $v.Package.Form.Price.$dirty && $v.Package.Form.Price.$invalid}"
                  >
                    <label for="Package-Price">Preço</label>
                    <md-input
                      id="Package-Price"
                      name="Package-Price"
                      type="number"
                      @blur="$v.Package.Form.Price.$touch()"
                      @focus="$v.Package.Form.Price.$reset()"
                      v-model="Package.Form.Price"
                      required
                    ></md-input>
                    <span class="md-error" v-if="!$v.Package.Form.Price.required">Obrigatório</span>
                  </md-field>
                </div>
                <p>
                  <span class="md-body-2 s1-U__text-color--dark-2">
                    <span class="s1-U__mg--rt4">Custo de</span>
                    <b>{{formatMoney(getServicesCost())}}</b>
                  </span>
                </p>
                <p>
                  <span class="md-body-2 s1-U__text-color--dark-2">
                    <span class="s1-U__mg--rt4">Será repassado por</span>
                    <b class="s1-U__text-color--accent">{{formatMoney(Package.Form.Price)}}</b>
                  </span>
                </p>
              </div>
            </section>
            <md-card-actions class="s1-U__pd16">
              <md-button
                class="md-primary md-raised"
                @click="saveCreated('Package')"
                :disabled="$v.Package.Form.$invalid"
              >Cadastrar pacote</md-button>
            </md-card-actions>
          </md-card-content>
        </md-card>
        <md-dialog
          class="s1-loc-comp__services-dialog"
          :md-close-on-esc="false"
          :md-click-outside-to-close="false"
          :md-active.sync="Package.ServicesDialog"
        >
          <div class="s1-U__pd16 s1-U__border--bottom1 s1-U__flex-shrink-0">
            <h2 class="md-title">Serviços</h2>
          </div>
          <div class="s1-U__align-children--stretch s1-U__full-height s1-U__bg-color--body-bg">
            <div class="s1-U__bg-color--white s1-U__width--210px s1-U__flex-shrink-0">
              <md-list class="s1-U__pd0">
                <md-list-item
                  v-for="type in ServiceTypes"
                  :key="'type-' + type.Id + '-menu'"
                  @click="Package.ActiveCategory = type.Id; closeAndClearDetails()"
                  :class="{'s1-loc-comp__avtive-border-right s1-U__text-color--primary' : Package.ActiveCategory === type.Id}"
                >
                  <p class="s1-U__mg--rt8">{{type.Name}}</p>
                  <md-badge
                    v-if="getIncludedServicesByType(type.Id).length > 0"
                    :md-content="getIncludedServicesByType(type.Id).length"
                    class="md-primary"
                  ></md-badge>
                </md-list-item>
              </md-list>
            </div>
            <div class="s1-U__vertical-divider s1-U__flex-shrink-0 s1-U__full-height"></div>
            <div
              class="s1-U__full-height s1-U__full-width s1-U__flex-column s1-U__bg-color--body-bg"
            >
              <div
                class="s1-U__pd16 s1-U__border--bottom1 s1-U__align-children--center s1-U__justify-content--flex-end"
              >
                <!-- <md-button class="s1-md-bordered">
                <div class="s1-U__align-children--center s1-U__pd--rt8">
                  <md-icon class="s1-U__mg--rt8">filter_list</md-icon>
                  <span>Filtros</span>
                </div>
                </md-button>-->
                <div class="s1-loc__md-field-wrapper s1-U__width--180px">
                  <md-field class="s1-U__mg0">
                    <md-input class="s1-U__full-width" placeholder="Buscar"/>
                    <md-button
                      type="submit"
                      class="s1-U__mg0 md-icon-button md-dense squared"
                      style=" margin-top: -2px; margin-right: 2px;"
                    >
                      <md-icon>search</md-icon>
                    </md-button>
                  </md-field>
                </div>
              </div>
              <md-content
                class="md-scrollbar s1-U__full-height s1-U__full-width s1-U__pd16 s1-U__bg-color--body-bg"
                style="overflow: auto;"
              >
                <md-card
                  class="s1-U__mg--bt16 s1-loc-comp__service-card"
                  v-for="service in getServices(Package.ActiveCategory)"
                  :key="service.Id"
                >
                  <div
                    class="s1-loc-comp__service-card-included"
                    :class="{'active' : hasIncluded(service.Id)}"
                  >
                    <md-icon class="md-primary">check_circle</md-icon>
                  </div>
                  <div class="s1-U__pd--rt16 s1-U__pd--tp16 s1-U__pd--lt16 s1-U__pd--bt8">
                    <h3 class="md-title">{{service.FriendlyName}}</h3>
                  </div>
                  <div
                    class="s1-U__pd--rt16 s1-U__pd--bt16 s1-U__pd--lt16 s1-U__align-children--center s1-U__justify-content--space-between"
                  >
                    <h3 class="s1-U__fw--300 s1-U__text-color--primary s1-U__pd--rt16">
                      <span class="md-caption s1-U__text-color--accent">
                        {{formatMoney(service.Cost)}}
                        <md-tooltip md-direction="right">Custo fornecedor</md-tooltip>
                      </span>
                    </h3>
                    <div class="s1-U__text-align--right s1-U__align-children--center">
                      <md-button
                        class="s1-U__mg--rt8 md-dense"
                        @click="setShowServiceDetail(service)"
                      >{{service.Id === Package.DetailedService.Id ? 'fechar detalhes' : 'ver detalhes'}}</md-button>
                      <md-button
                        class="md-dense"
                        @click="!hasIncluded(service.Id) ? Package.Form.Services = addNewItemAbove(Package.Form.Services, service.Id) : Package.Form.Services = removeItemFromArray(Package.Form.Services, service.Id)"
                      >{{!hasIncluded(service.Id) ? 'adicionar' : 'remover'}}</md-button>
                    </div>
                  </div>
                </md-card>
              </md-content>
            </div>
            <div class="s1-U__vertical-divider s1-U__flex-shrink-0 s1-U__full-height"></div>
            <div
              class="s1-U__flex-column s1-U__bg-color--white s1-U__flex-shrink-0 s1-U__width--320px"
            >
              <div class="s1-U__pd16 s1-U__flex-shrink-0">
                <h2 class="s1-U__fw--300">Resumo</h2>
              </div>
              <md-content
                class="md-scrollbar s1-U__full-height s1-U__full-width s1-U__pd0 s1-U__pd--bt16"
                style="overflow: auto;"
                v-if="Package.Form.Services.length > 0"
              >
                <div v-for="type in ServiceTypes" :key="'type-' + type.Id + '-menu'">
                  <div class="s1-U__pd16" v-if="getIncludedServicesByType(type.Id).length">
                    <div class="s1-U__align-children--bottom s1-U__justify-content--space-between">
                      <span class="subheading s1-U__mg--rt8">{{type.Name}}</span>
                      <p
                        :class="{'s1-U__invisible' : getIncludedServicesByType(type.Id).length === 0}"
                        class="s1-U__pd--lt32 md-title s1-U__text-color--dark-2"
                      >{{formatMoney(getPriceByType(type.Id))}}</p>
                    </div>
                    <div class="s1-U__pd--lt16 s1-U__mg--tp4">
                      <div
                        class="md-caption s1-U__mg--tp4"
                        v-for="service in getIncludedServicesByType(type.Id)"
                        :key="service.Id"
                      >
                        <span>{{service.FriendlyName}}</span>
                        <span class="s1-U__mg--lt16">{{formatMoney(service.Cost)}}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </md-content>
              <md-content
                class="md-scrollbar s1-U__full-height s1-U__full-width s1-U__pd0 s1-U__pd--bt16"
                style="overflow: auto;"
                v-else
              >
                <p class="s1-U__pd16">Nenhum serviço nesse pacote</p>
              </md-content>
              <div
                class="s1-U__pd16 s1-U__flex-shrink-0 s1-U__text-align--right"
                style="z-index: 0"
              >
                <md-button
                  class="s1-md-bordered md-primary"
                  @click="Package.ServicesDialog = false"
                >concluir</md-button>
              </div>
            </div>
            <div
              class="s1-mezzanine-wrapper s1-U__full-height s1-U__bg-color--white s1-U__width--320px"
              :class="{'active' : Package.ShowServiceDetails}"
            >
              <div class="s1-mezzanine" :class="{'active' : Package.ShowServiceDetails}">
                <md-card class="s1-U__full-height">
                  <div
                    class="s1-U__border--bottom1 s1-U__align-children--top s1-U__full-width s1-U__justify-content--space-between"
                  >
                    <div class="s1-U__pd16 s1-U__flex-shrink-0 s1-U__width--240px">
                      <p class="md-caption s1-U__text-uppercase">DETALHES</p>
                      <h2 class="md-title s1-U__text-ellipsis">{{Package.DetailedService.Name}}</h2>
                    </div>
                    <md-button
                      class="md-icon-button s1-U__flex-shrink-0 s1-U__mg--tp8 s1-U__mg--rt8"
                      @click="closeAndClearDetails()"
                    >
                      <md-icon>close</md-icon>
                    </md-button>
                  </div>
                  <md-card-content>
                    <md-content
                      class="md-scrollbar s1-U__pd16"
                      style="overflow: auto;"
                      v-if="Package.DetailedService.Id"
                    >
                      <div class="s1-U__pd--lt16 s1-U__mg--bt16">
                        <p class="md-caption">TIPO</p>
                        <p
                          class="s1-U__text-ellipsis"
                        >{{getNameById(ServiceTypes ,Package.DetailedService.Type)}}</p>
                      </div>
                      <div class="s1-U__pd--lt16 s1-U__mg--bt16">
                        <p class="md-caption">FORNECEDOR</p>
                        <p
                          class="s1-U__text-ellipsis"
                        >{{getNameById(Suppliers ,Package.DetailedService.Supplier)}}</p>
                      </div>
                      <div class="s1-U__pd--lt16 s1-U__mg--bt16">
                        <p class="md-caption">VIGÊNCIA</p>
                        <p class="s1-U__text-ellipsis">{{Package.DetailedService.Vigence}} meses</p>
                      </div>
                      <h3
                        class="md-title s1-U__mg--bt16 s1-U__mg--tp32 s1-U__text-color--primary"
                      >Custos</h3>
                      <div class="s1-U__pd--lt16 s1-U__mg--bt16">
                        <p class="md-caption">CUSTO FORNECEDOR</p>
                        <p class="s1-U__text-ellipsis">{{formatMoney(Package.DetailedService.Cost)}}</p>
                      </div>
                      <h3
                        class="md-title s1-U__mg--bt16 s1-U__mg--tp32 s1-U__text-color--primary"
                      >Descrição</h3>
                      <div class="s1-U__pd--lt16 s1-U__mg--bt16">
                        <p class>{{Package.DetailedService.Description}}</p>
                      </div>
                    </md-content>
                  </md-card-content>
                </md-card>
              </div>
            </div>
          </div>
        </md-dialog>
      </div>
      <div
        class="s1-U__width--900px s1-U__pd16"
        style="margin: 0 auto; position: relative;"
        v-show="Package.EditionInterface"
      >
        <div
          class="md-layout md-alignment-center-center s1-loc__loading"
          :class="Package.Loading && 'active'"
        >
          <md-progress-spinner md-mode="indeterminate"></md-progress-spinner>
        </div>
        <div class="s1-U__mg--bt32">
          <h1 class="md-display-1 s1-U__text-color--dark-2 s1-U__align-children--center">
            <md-button
              class="md-dense md-icon-button s1-U__mg--rt16"
              @click="Package.DiscardEditionInterface = true"
            >
              <md-icon>arrow_back</md-icon>
            </md-button>
            <span>Cadastro de pacote</span>
          </h1>
        </div>
        <md-card>
          <md-card-content>
            <section class="s1-U__mg--bt32">
              <h3
                class="md-title s1-U__text-color--primary s1-U__fw--300 s1-U__mg--bt16 s1-U__mg--tp4"
              >Geral</h3>
              <div class="s1-U__pd--lt16">
                <div class="s1-loc__md-field-wrapper s1-U__width--240px">
                  <md-field
                    :class="{'md-invalid md-field-helper-text': $v.Package.Form.Name.$dirty && $v.Package.Form.Name.$invalid}"
                  >
                    <label for="Package-edit-Name">Nome</label>
                    <md-input
                      id="Package-edit-Name"
                      name="Package-edit-Name"
                      type="text"
                      @blur="$v.Package.Form.Name.$touch()"
                      @focus="$v.Package.Form.Name.$reset()"
                      v-model="Package.Form.Name"
                      required
                    ></md-input>
                    <span class="md-error" v-if="!$v.Package.Form.Name.required">Obrigatório</span>
                    <span
                      class="md-error"
                      v-if="!$v.Package.Form.Name.minLength"
                    >Mínimo de 4 caracteres</span>
                  </md-field>
                </div>
                <div class="s1-loc__md-field-wrapper s1-U__width--180px">
                  <md-field>
                    <label for="Package-edit-TenantId">Conta</label>
                    <md-select
                      id="Package-edit-TenantId"
                      name="Package-edit-TenantId"
                      v-model="Package.Form.TenantId"
                    >
                      <md-option
                        v-for="account in Accounts"
                        :key="'account' + account.Id"
                        :value="account.Id"
                      >{{account.Name}}</md-option>
                    </md-select>
                  </md-field>
                </div>
              </div>
            </section>
            <section class="s1-U__mg--bt64">
              <h3 class="md-title s1-U__text-color--primary s1-U__fw--300 s1-U__mg--bt16">Serviços</h3>
              <div class="s1-U__pd--lt16 s1-U__pd--rt16">
                <div v-if="Package.Form.Services.length === 0">
                  <p
                    class="md-body-2 s1-U__text-color--dark-2 s1-U__mg--bt8"
                  >Nenhum serviço adicionado</p>
                  <md-button
                    class="md-primary s1-md-bordered"
                    @click="Package.ServicesDialog = true; closeAndClearDetails()"
                  >
                    <div class="s1-U__align-children--center s1-U__pd--rt8 s1-U__pd--lt4">
                      <md-icon class="s1-U__mg--rt4">add</md-icon>
                      <span>Serviço</span>
                    </div>
                  </md-button>
                  <p class="s1-U__text-color--dark-2 md-caption s1-U__mg--tp8">
                    É necessário pelo menos
                    <b>um</b> serviço para a criação do pacote.
                  </p>
                </div>
                <div v-else>
                  <div class="s1-U__width--400px">
                    <div
                      class="s1-U__align-children--center s1-U__justify-content--space-between s1-U__mg--bt4"
                      v-for="service in Package.Form.Services"
                      :key="service + '-service-in-list'"
                    >
                      <span
                        class="s1-U__width--210px s1-U__text-ellipsis"
                      >{{getPropById(Services, service, 'FriendlyName')}}</span>
                      <div class="s1-U__align-children--center">
                        <span
                          class="md-body-2 s1-U__text-color--accent s1-U__mg--rt8 s1-U__flex-shrink-0"
                        >{{formatMoney(getPropById(Services, service, 'Cost'))}}</span>
                        <md-button
                          class="md-dense s1-md-bordered s1-U__flex-shrink-0"
                          @click="setShowServiceDetail(getObjByProp(Services, service, 'Id'))"
                        >{{getPropById(Services, service, "Id") === Package.DetailedService.Id ? 'fechar detalhes' : 'ver detalhes'}}</md-button>
                      </div>
                    </div>
                  </div>
                  <md-button
                    class="md-primary s1-md-bordered s1-U__mg--tp16"
                    @click="Package.ServicesDialog = true; closeAndClearDetails()"
                  >adicionar / remover serviços</md-button>
                </div>
              </div>
            </section>
            <section class="s1-U__mg--bt64">
              <h3
                class="md-title s1-U__text-color--primary s1-U__fw--300 s1-U__mg--bt16"
              >Valor do pacote</h3>

              <div class="s1-U__pd--lt16">
                <div class="s1-loc__md-field-wrapper s1-U__width--130px">
                  <md-field
                    :class="{'md-invalid md-field-helper-text': $v.Package.Form.Price.$dirty && $v.Package.Form.Price.$invalid}"
                  >
                    <label for="Package-edit-Price">Preço</label>
                    <md-input
                      id="Package-edit-Price"
                      name="Package-edit-Price"
                      type="number"
                      @blur="$v.Package.Form.Price.$touch()"
                      @focus="$v.Package.Form.Price.$reset()"
                      v-model="Package.Form.Price"
                      required
                    ></md-input>
                    <span class="md-error" v-if="!$v.Package.Form.Price.required">Obrigatório</span>
                  </md-field>
                </div>
                <p>
                  <span class="md-body-2 s1-U__text-color--dark-2">
                    <span class="s1-U__mg--rt4">Custo de</span>
                    <b>{{formatMoney(getServicesCost())}}</b>
                  </span>
                </p>
                <p>
                  <span class="md-body-2 s1-U__text-color--dark-2">
                    <span class="s1-U__mg--rt4">Será repassado por</span>
                    <b class="s1-U__text-color--accent">{{formatMoney(Package.Form.Price)}}</b>
                  </span>
                </p>
              </div>
            </section>
            <md-card-actions class="s1-U__pd16">
              <md-button
                class="md-primary md-raised"
                @click="saveEdited('Package')"
                :disabled="$v.Package.Form.$invalid"
              >Salvar</md-button>
            </md-card-actions>
          </md-card-content>
        </md-card>
        <md-dialog
          class="s1-loc-comp__services-dialog"
          :md-close-on-esc="false"
          :md-click-outside-to-close="false"
          :md-active.sync="Package.ServicesDialog"
        >
          <div class="s1-U__pd16 s1-U__border--bottom1 s1-U__flex-shrink-0">
            <h2 class="md-title">Serviços</h2>
          </div>
          <div class="s1-U__align-children--stretch s1-U__full-height s1-U__bg-color--body-bg">
            <div class="s1-U__bg-color--white s1-U__width--210px s1-U__flex-shrink-0">
              <md-list class="s1-U__pd0">
                <md-list-item
                  v-for="type in ServiceTypes"
                  :key="'type-' + type.Id + '-menu'"
                  @click="Package.ActiveCategory = type.Id; closeAndClearDetails()"
                  :class="{'s1-loc-comp__avtive-border-right s1-U__text-color--primary' : Package.ActiveCategory === type.Id}"
                >
                  <p class="s1-U__mg--rt8">{{type.Name}}</p>
                  <md-badge
                    v-if="getIncludedServicesByType(type.Id).length > 0"
                    :md-content="getIncludedServicesByType(type.Id).length"
                    class="md-primary"
                  ></md-badge>
                </md-list-item>
              </md-list>
            </div>
            <div class="s1-U__vertical-divider s1-U__flex-shrink-0 s1-U__full-height"></div>
            <div
              class="s1-U__full-height s1-U__full-width s1-U__flex-column s1-U__bg-color--body-bg"
            >
              <div
                class="s1-U__pd16 s1-U__border--bottom1 s1-U__align-children--center s1-U__justify-content--flex-end"
              >
                <!-- <md-button class="s1-md-bordered">
                <div class="s1-U__align-children--center s1-U__pd--rt8">
                  <md-icon class="s1-U__mg--rt8">filter_list</md-icon>
                  <span>Filtros</span>
                </div>
                </md-button>-->
                <div class="s1-loc__md-field-wrapper s1-U__width--180px">
                  <md-field class="s1-U__mg0">
                    <md-input class="s1-U__full-width" placeholder="Buscar"/>
                    <md-button
                      type="submit"
                      class="s1-U__mg0 md-icon-button md-dense squared"
                      style=" margin-top: -2px; margin-right: 2px;"
                    >
                      <md-icon>search</md-icon>
                    </md-button>
                  </md-field>
                </div>
              </div>
              <md-content
                class="md-scrollbar s1-U__full-height s1-U__full-width s1-U__pd16 s1-U__bg-color--body-bg"
                style="overflow: auto;"
              >
                <md-card
                  class="s1-U__mg--bt16 s1-loc-comp__service-card"
                  v-for="service in getServices(Package.ActiveCategory)"
                  :key="service.Id"
                >
                  <div
                    class="s1-loc-comp__service-card-included"
                    :class="{'active' : hasIncluded(service.Id)}"
                  >
                    <md-icon class="md-primary">check_circle</md-icon>
                  </div>
                  <div class="s1-U__pd--rt16 s1-U__pd--tp16 s1-U__pd--lt16 s1-U__pd--bt8">
                    <h3 class="md-title">{{service.FriendlyName}}</h3>
                  </div>
                  <div
                    class="s1-U__pd--rt16 s1-U__pd--bt16 s1-U__pd--lt16 s1-U__align-children--center s1-U__justify-content--space-between"
                  >
                    <h3 class="s1-U__fw--300 s1-U__text-color--primary s1-U__pd--rt16">
                      <span class="md-caption s1-U__text-color--accent">
                        {{formatMoney(service.Cost)}}
                        <md-tooltip md-direction="right">Custo fornecedor</md-tooltip>
                      </span>
                    </h3>
                    <div class="s1-U__text-align--right s1-U__align-children--center">
                      <md-button
                        class="s1-U__mg--rt8 md-dense"
                        @click="setShowServiceDetail(service)"
                      >{{service.Id === Package.DetailedService.Id ? 'fechar detalhes' : 'ver detalhes'}}</md-button>
                      <md-button
                        class="md-dense"
                        @click="!hasIncluded(service.Id) ? Package.Form.Services = addNewItemAbove(Package.Form.Services, service.Id) : Package.Form.Services = removeItemFromArray(Package.Form.Services, service.Id)"
                      >{{!hasIncluded(service.Id) ? 'adicionar' : 'remover'}}</md-button>
                    </div>
                  </div>
                </md-card>
              </md-content>
            </div>
            <div class="s1-U__vertical-divider s1-U__flex-shrink-0 s1-U__full-height"></div>
            <div
              class="s1-U__flex-column s1-U__bg-color--white s1-U__flex-shrink-0 s1-U__width--320px"
            >
              <div class="s1-U__pd16 s1-U__flex-shrink-0">
                <h2 class="s1-U__fw--300">Resumo</h2>
              </div>
              <md-content
                class="md-scrollbar s1-U__full-height s1-U__full-width s1-U__pd0 s1-U__pd--bt16"
                style="overflow: auto;"
                v-if="Package.Form.Services.length > 0"
              >
                <div v-for="type in ServiceTypes" :key="'type-' + type.Id + '-menu'">
                  <div class="s1-U__pd16" v-if="getIncludedServicesByType(type.Id).length">
                    <div class="s1-U__align-children--bottom s1-U__justify-content--space-between">
                      <span class="subheading s1-U__mg--rt8">{{type.Name}}</span>
                      <p
                        :class="{'s1-U__invisible' : getIncludedServicesByType(type.Id).length === 0}"
                        class="s1-U__pd--lt32 md-title s1-U__text-color--dark-2"
                      >{{formatMoney(getPriceByType(type.Id))}}</p>
                    </div>
                    <div class="s1-U__pd--lt16 s1-U__mg--tp4">
                      <div
                        class="md-caption s1-U__mg--tp4"
                        v-for="service in getIncludedServicesByType(type.Id)"
                        :key="service.Id"
                      >
                        <span>{{service.FriendlyName}}</span>
                        <span class="s1-U__mg--lt16">{{formatMoney(service.Cost)}}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </md-content>
              <md-content
                class="md-scrollbar s1-U__full-height s1-U__full-width s1-U__pd0 s1-U__pd--bt16"
                style="overflow: auto;"
                v-else
              >
                <p class="s1-U__pd16">Nenhum serviço nesse pacote</p>
              </md-content>
              <div
                class="s1-U__pd16 s1-U__flex-shrink-0 s1-U__text-align--right"
                style="z-index: 0"
              >
                <md-button
                  class="s1-md-bordered md-primary"
                  @click="Package.ServicesDialog = false"
                >concluir</md-button>
              </div>
            </div>
            <div
              class="s1-mezzanine-wrapper s1-U__full-height s1-U__bg-color--white s1-U__width--320px"
              :class="{'active' : Package.ShowServiceDetails}"
            >
              <div class="s1-mezzanine" :class="{'active' : Package.ShowServiceDetails}">
                <md-card class="s1-U__full-height">
                  <div
                    class="s1-U__border--bottom1 s1-U__align-children--top s1-U__full-width s1-U__justify-content--space-between"
                  >
                    <div class="s1-U__pd16 s1-U__flex-shrink-0 s1-U__width--240px">
                      <p class="md-caption s1-U__text-uppercase">DETALHES</p>
                      <h2 class="md-title s1-U__text-ellipsis">{{Package.DetailedService.Name}}</h2>
                    </div>
                    <md-button
                      class="md-icon-button s1-U__flex-shrink-0 s1-U__mg--tp8 s1-U__mg--rt8"
                      @click="closeAndClearDetails()"
                    >
                      <md-icon>close</md-icon>
                    </md-button>
                  </div>
                  <md-card-content>
                    <md-content
                      class="md-scrollbar s1-U__pd16"
                      style="overflow: auto;"
                      v-if="Package.DetailedService.Id"
                    >
                      <div class="s1-U__pd--lt16 s1-U__mg--bt16">
                        <p class="md-caption">TIPO</p>
                        <p
                          class="s1-U__text-ellipsis"
                        >{{getNameById(ServiceTypes ,Package.DetailedService.Type)}}</p>
                      </div>
                      <div class="s1-U__pd--lt16 s1-U__mg--bt16">
                        <p class="md-caption">FORNECEDOR</p>
                        <p
                          class="s1-U__text-ellipsis"
                        >{{getNameById(Suppliers ,Package.DetailedService.Supplier)}}</p>
                      </div>
                      <div class="s1-U__pd--lt16 s1-U__mg--bt16">
                        <p class="md-caption">VIGÊNCIA</p>
                        <p class="s1-U__text-ellipsis">{{Package.DetailedService.Vigence}} meses</p>
                      </div>
                      <h3
                        class="md-title s1-U__mg--bt16 s1-U__mg--tp32 s1-U__text-color--primary"
                      >Custos</h3>
                      <div class="s1-U__pd--lt16 s1-U__mg--bt16">
                        <p class="md-caption">CUSTO FORNECEDOR</p>
                        <p class="s1-U__text-ellipsis">{{formatMoney(Package.DetailedService.Cost)}}</p>
                      </div>
                      <h3
                        class="md-title s1-U__mg--bt16 s1-U__mg--tp32 s1-U__text-color--primary"
                      >Descrição</h3>
                      <div class="s1-U__pd--lt16 s1-U__mg--bt16">
                        <p class>{{Package.DetailedService.Description}}</p>
                      </div>
                    </md-content>
                  </md-card-content>
                </md-card>
              </div>
            </div>
          </div>
        </md-dialog>
      </div>
      <div
        class="s1-mezzanine-wrapper s1-U__full-height s1-U__bg-color--white"
        :class="{'active' : Package.ShowServiceDetails && !Package.ServicesDialog}"
      >
        <div
          class="s1-mezzanine"
          :class="{'active' : Package.ShowServiceDetails && !Package.ServicesDialog}"
        >
          <md-card class="s1-U__full-height">
            <div
              class="s1-U__border--bottom1 s1-U__align-children--top s1-U__full-width s1-U__justify-content--space-between"
            >
              <div class="s1-U__pd16 s1-U__flex-shrink-0 s1-U__width--240px">
                <p class="md-caption s1-U__text-uppercase">DETALHES</p>
                <h2 class="md-title s1-U__text-ellipsis">{{Package.DetailedService.Name}}</h2>
              </div>
              <md-button
                class="md-icon-button s1-U__flex-shrink-0 s1-U__mg--tp8 s1-U__mg--rt8"
                @click="closeAndClearDetails()"
              >
                <md-icon>close</md-icon>
              </md-button>
            </div>
            <md-card-content>
              <md-content
                class="md-scrollbar s1-U__pd16"
                style="overflow: auto;"
                v-if="Package.DetailedService.Id"
              >
                <div class="s1-U__pd--lt16 s1-U__mg--bt16">
                  <p class="md-caption">TIPO</p>
                  <p
                    class="s1-U__text-ellipsis"
                  >{{getNameById(ServiceTypes ,Package.DetailedService.Type)}}</p>
                </div>
                <div class="s1-U__pd--lt16 s1-U__mg--bt16">
                  <p class="md-caption">FORNECEDOR</p>
                  <p
                    class="s1-U__text-ellipsis"
                  >{{getNameById(Suppliers ,Package.DetailedService.Supplier)}}</p>
                </div>
                <div class="s1-U__pd--lt16 s1-U__mg--bt16">
                  <p class="md-caption">VIGÊNCIA</p>
                  <p class="s1-U__text-ellipsis">{{Package.DetailedService.Vigence}} meses</p>
                </div>
                <h3 class="md-title s1-U__mg--bt16 s1-U__mg--tp32 s1-U__text-color--primary">Custos</h3>
                <div class="s1-U__pd--lt16 s1-U__mg--bt16">
                  <p class="md-caption">CUSTO FORNECEDOR</p>
                  <p class="s1-U__text-ellipsis">{{formatMoney(Package.DetailedService.Cost)}}</p>
                </div>
                <h3
                  class="md-title s1-U__mg--bt16 s1-U__mg--tp32 s1-U__text-color--primary"
                >Descrição</h3>
                <div class="s1-U__pd--lt16 s1-U__mg--bt16">
                  <p class>{{Package.DetailedService.Description}}</p>
                </div>
              </md-content>
            </md-card-content>
          </md-card>
        </div>
      </div>
      <md-dialog-confirm
        :md-active.sync="Package.DiscardCreationInterface"
        md-title="Descartar cadastro?"
        md-content="Ao sair, as informações do pacote em cadastro serão descartadas"
        md-confirm-text="descartar"
        md-cancel-text="voltar"
        @md-cancel="Package.DiscardCreationInterface = false"
        @md-confirm="discardCreation('Package')"
      />
      <md-snackbar
        :md-duration="Settings.snackbarDuration"
        :md-active.sync="Package.SuccessFeedbackCreation"
        md-persistent
      >
        <span>Pacote criado com sucesso</span>
        <md-button class="md-accent" @click="Package.SuccessFeedbackCreation = false">OK</md-button>
      </md-snackbar>
      <md-dialog-confirm
        :md-active.sync="Package.DiscardEditionInterface"
        md-title="Descartar cadastro?"
        md-content="Ao sair, as informações do pacote em edição serão descartadas"
        md-confirm-text="descartar"
        md-cancel-text="voltar"
        @md-cancel="Package.DiscardEditionInterface = false"
        @md-confirm="discardEdition('Package')"
      />
      <md-snackbar
        :md-duration="Settings.snackbarDuration"
        :md-active.sync="Package.SuccessFeedbackEdition"
        md-persistent
      >
        <span>Pacote editado com sucesso</span>
        <md-button class="md-accent" @click="Package.SuccessFeedbackEdition = false">OK</md-button>
      </md-snackbar>
    </div>
  </div>
</template>

<script>
import { required, minLength } from "vuelidate/lib/validators";

import LongText from "./data/LongText.js";

import Packages from "./data/Packages.js";
import Accounts from "./data/Accounts.js";
import Services from "./data/Services.js";
import Suppliers from "./data/Suppliers.js";
import ServiceTypes from "./data/ServiceTypes.js";
import Currencies from "./data/Currencies.js";
import Operators from "./data/Operators.js";

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
    Accounts,
    Services,
    Suppliers,
    ServiceTypes,
    LongText,
    Currencies,
    Operators,
    Package: {
      moreQty: 3,
      Form: {
        Id: null,
        Name: null,
        Services: [],
        TenantId: null,
        ServicesCost: null,
        TotalCost: null,
        Price: 0.0
      },
      DefaultForm: {
        Id: null,
        Name: null,
        Services: [],
        TenantId: null,
        ServicesCost: null,
        TotalCost: null,
        Price: 0.0
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
      ServicesDialog: false,
      ActiveCategory: "0",
      ShowServiceDetails: false,
      DetailedService: {
        Id: null,
        Name: null,
        FriendlyName: null,
        Supplier: null,
        Type: null,
        Description: null,
        Cost: null,
        Vigence: null,
        Rules: [
          {
            Appliedto: "Titular",
            Operator: "=",
            Value: "1"
          },
          {
            Appliedto: "Beneficiário",
            Operator: "=",
            Value: "0"
          },
          {
            Appliedto: "Dependente",
            Operator: "=",
            Value: "0"
          }
        ]
      }
    },
    Service: {
      moreQty: 3,
      Form: {
        Id: null,
        Name: null,
        FriendlyName: null,
        Supplier: null,
        Type: null,
        Description: null,
        Cost: 0.0,
        Vigence: 30,
        CurrencyCode: "BRL",
        Rules: [
          {
            Appliedto: "Titular",
            Operator: "=",
            Value: "1"
          },
          {
            Appliedto: "Beneficiário",
            Operator: "=",
            Value: "0"
          },
          {
            Appliedto: "Dependente",
            Operator: "=",
            Value: "0"
          }
        ]
      },
      FormFavoredVisibility: {
        Titular: true,
        Beneficiário: false,
        Dependente: false
      },
      DefaultForm: {
        Id: null,
        Name: null,
        FriendlyName: null,
        Supplier: null,
        Type: null,
        Description: null,
        Cost: 0.0,
        Vigence: 30,
        CurrencyCode: "BRL",
        Rules: [
          {
            Appliedto: "Titular",
            Operator: "=",
            Value: "1"
          },
          {
            Appliedto: "Beneficiário",
            Operator: "=",
            Value: "0"
          },
          {
            Appliedto: "Dependente",
            Operator: "=",
            Value: "0"
          }
        ]
      },
      Data: Services,
      MockData: Services,
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
      ServicesDialog: false,
      ActiveCategory: "0",
      ShowServiceDetails: false,
      DetailedService: {
        Id: null,
        Name: null,
        FriendlyName: null,
        Supplier: null,
        Type: null,
        Description: null,
        Cost: null,
        Vigence: null,
        Rules: [
          {
            Appliedto: "Titular",
            Operator: "=",
            Value: "1"
          },
          {
            Appliedto: "Beneficiário",
            Operator: "=",
            Value: "0"
          },
          {
            Appliedto: "Dependente",
            Operator: "=",
            Value: "0"
          }
        ]
      }
    },
    Settings: {
      snackbarDuration: 3000,
      activePage: "allPackages"
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
      this.setEditingIndex("Package", id);
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
    removeItemFromArray(array, id) {
      return array.filter(item => {
        return item !== id;
      });
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
    },
    hasIncluded(id) {
      return this.Package.Form.Services.includes(id);
    },
    getServices(type) {
      return this.getListByProp(this.Services, type, "Type");
    },
    getObjIncluded() {
      if (this.Package.Form.Services.length === 0) return [];
      return this.Package.Form.Services.map(serviceId => {
        return getObjByProp(Services, serviceId, "Id");
      });
    },
    getIncludedServicesByType(type) {
      return this.getListByProp(this.getObjIncluded(), type, "Type");
    },
    getPriceByType(type) {
      if (this.getIncludedServicesByType(type).length === 0) return 0;
      const reducer = (accumulator, currentValue) => {
        return accumulator + currentValue.Cost;
      };
      const array = this.getIncludedServicesByType(type);
      return array.reduce(reducer, 0);
    },
    closeAndClearDetails() {
      this.Package.ShowServiceDetails = false;
      this.Package.DetailedService = {
        Id: null,
        Name: null,
        Supplier: null,
        Type: null,
        Description: null,
        Cost: null,
        Value: null,
        Vigence: null
      };
    },
    setShowServiceDetail(service) {
      if (service.Id === this.Package.DetailedService.Id) {
        this.closeAndClearDetails();
      } else {
        this.Package.ShowServiceDetails = true;
        this.Package.DetailedService = service;
      }
    },
    getServicesCost() {
      let cost = 0;
      if (this.Package.Form.Services.length > 0) {
        cost = this.Package.Form.Services.map(s => {
          return getPropById(Services, s, "Cost");
        }).reduce((accumulator, currentValue) => {
          return accumulator + currentValue;
        });
      }

      this.Package.Form.ServicesCost = cost;
      return cost;
    },
    getServicesValue() {
      let value = 0;
      if (this.Package.Form.Services.length > 0) {
        value = this.Package.Form.Services.map(s => {
          return getPropById(Services, s, "Value");
        }).reduce((accumulator, currentValue) => {
          return accumulator + currentValue;
        });
      }

      this.Package.Form.TotalCost = value;
      return value;
    }
  },
  validations: {
    Package: {
      Form: {
        Name: {
          required,
          minLength: minLength(4)
        },
        Services: {
          required,
          minLength: minLength(1)
        },
        Price: {
          required
        },
        TenantId: {
          required
        }
      }
    },
    Service: {
      Form: {
        Name: {
          required,
          minLength: minLength(4)
        },
        FriendlyName: {
          required,
          minLength: minLength(4)
        },
        Supplier: {
          required
        },
        Type: {
          required
        },
        Cost: {
          required
        },
        Vigence: {
          required
        },
        Rules: [
          {
            Value: {
              required
            }
          },
          {
            Value: {
              required
            }
          },
          {
            Value: {
              required
            }
          }
        ]
      }
    }
  }
};
</script>
