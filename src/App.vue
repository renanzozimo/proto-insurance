<template>
  <div
    id="app"
    :class="{'s1-loc-comp__mezzanine-is-active' : (Package.ShowServiceDetails && !Package.ServicesDialog) || Service.ShowServiceDetails}"
  >
    <div class="s1-prop__auto-gen">
      <md-button
        class="md-icon-button squared"
        @click="Settings.activePage = 'allPackages'"
        :class="{'md-primary' : Settings.activePage === 'allPackages'}"
      >PK</md-button>
      <md-button
        class="md-icon-button squared"
        @click="Settings.activePage = 'allServices'"
        :class="{'md-primary' : Settings.activePage === 'allServices'}"
      >SV</md-button>
      <md-button
        class="md-icon-button squared"
        @click="Settings.activePage = 'allSuppliers'"
        :class="{'md-primary' : Settings.activePage === 'allSuppliers'}"
      >FC</md-button>
    </div>
    <div v-if="Settings.activePage === 'allServices'">
      <section class="s1-U__width--900px s1-U__pd16" style="margin: 0 auto;">
        <div
          v-show="Service.Data.length > 0 && !Service.CreationInterface && !Service.EditionInterface"
        >
          <div class="s1-U__full-width s1-U__mg--bt32">
            <h1 class="md-display-1 s1-U__text-color--dark-2 s1-U__align-children--center">
              <span>Serviços</span>
            </h1>
          </div>
          <div
            class="s1-U__align-children--center s1-U__pd--bt20 s1-U__justify-content--space-between"
          >
            <md-button class="s1-md-bordered" @click="Service.ShowFilter = true">
              <div class="s1-U__align-children--center">
                <md-icon>filter_list</md-icon>
                <span>filtros</span>
              </div>
            </md-button>
            <md-button
              class="md-raised md-primary"
              @click="create('Service', 'Service-Name')"
            >
              <div class="s1-U__align-children--center">
                <md-icon>add</md-icon>
                <span>serviço</span>
              </div>
            </md-button>
          </div>
          <md-dialog :md-active.sync="Service.ShowFilter">
            <header class="s1-U__border--bottom1 s1-U__align-children--center s1-U__justify-content--space-between s1-U__pd16 s1-U__flex-shrink-0">
              <h2 class="md-ditle">Filtros</h2>
              <md-button class="md-icon-button" @click="Service.ShowFilter = false">
                <md-icon>close</md-icon>
              </md-button>
            </header>
            <md-dialog-content class="s1-U__pd16 s1-U__pd--tp32 s1-U__width--540px">
                <div class="s1-U__mg--bt24">
                  <label class="s1-U__text-color--dark-2" for="">Custo de repasse</label>
                  <div class="s1-U__align-children--center s1-U__mg--tp8">
                    <span class="s1-U__mg--rt8">Entre</span>
                    <md-field class="s1-md-field--w100px s1-U__mg0">
                      <md-input
                        class="s1-U__text-align--center"
                        id="start"
                        name="start"
                        type="text"
                        value="R$ 0,00"
                      ></md-input>
                    </md-field>
                    <span class="s1-U__mg--rt8 s1-U__mg--lt8">e</span>
                    <md-field class="s1-md-field--w100px s1-U__mg0">
                      <md-input
                        class="s1-U__text-align--center"
                        id="end"
                        name="end"
                        type="text"
                        value="R$ 1530,00"
                      ></md-input>
                    </md-field>
                  </div>
                </div>

            </md-dialog-content>
            <md-dialog-actions class="s1-U__pd16 s1-U__flex-shrink-0 s1-U__border--top1">
              <md-button class="md-raised md-primary" @click="Service.ShowFilter = false">
                Filtrar
              </md-button>
            </md-dialog-actions>
          </md-dialog>
          <div class="s1-U__pd--bt16 s1-U__align-children--center s1-U__justify-content--space-between">
            <div>
              <div class="s1-U__text-color--dark-2 s1-U__pd--tp16">
                Resultados de busca por <b>"Sorteio"</b>
              </div>
            </div>
            <div class="s1-U__align-children--center s1-U__flex-shrink-0">
              <div class="s1-loc__md-field-wrapper s1-U__width--180px">
                <md-field class="s1-U__mg0">
                  <md-input
                    id="buscar"
                    name="buscar"
                    type="text"
                    value="Sorteio"
                    placeholder="buscar"
                  ></md-input>
                  <md-button class="md-icon-button md-dense squared s1-U__mg--lt8" style="margin-bottom: 3px; margin-right: 3px">
                    <md-icon>search</md-icon>
                  </md-button>
                </md-field>
                </div>
            </div>
          </div>
          <div class="s1-U__align-children--top">
            <div class="s1-U__flex-shrink-0 s1-U__width--210px s1-U__pd--rt16">
              <md-list class="s1-U__bg-color--transparent s1-U__pd0">
                <md-list-item
                  v-for="type in ServiceTypes"
                  :key="'type-' + type.Id + '-menu'"
                  @click="Service.ActiveCategory = type.Id; closeAndClearServiceDetails()"
                  :class="{'s1-loc-comp__avtive-border-right s1-U__text-color--primary' : Service.ActiveCategory === type.Id}"
                >
                  <p class="s1-U__mg--rt8">{{type.Name}}</p>
                  <md-badge
                    v-if="getListByProp(Service.Data, type.Id, 'ServiceType').length > 0"
                    :md-content="getListByProp(Service.Data, type.Id, 'ServiceType').length"
                    class="md-primary"
                  ></md-badge>
                </md-list-item>
              </md-list>
            </div>
            <div class="md-layout md-gutter s1-U__full-width">
              <!-- SERVICES LIST -->
              <div
                class="md-layout-item md-size-50 s1-U__mg--bt20"
                v-for="service in getListByProp(Service.Data, Service.ActiveCategory, 'ServiceType')"
                :key="service.Id"
              >
                <md-card>
                  <div class="s1-U__pd16 s1-U__border--bottom1">
                    <div class="s1-U__align-children--top s1-U__justify-content--space-between">
                      <div class="s1-U__full-width s1-U__text-ellipsis">
                        <h2 class="md-headline s1-U__text-ellipsis">{{service.FriendlyName}}</h2>
                        <span class="md-caption">{{getNameById(Supplier.Data, service.Supplier)}}</span>
                      </div>
                      <div class="s1-U__flex-shrink-0 s1-U__align-children--center">
                        <md-menu md-direction="bottom-end">
                          <md-button class="md-icon-button squared" md-menu-trigger>
                            <md-icon>more_vert</md-icon>
                          </md-button>

                          <md-menu-content>
                            <md-menu-item
                              @click="setShowServiceDetailInServices(service)"
                            >{{Service.DetailedService.Id === service.Id ? 'Fechar detalhes' : 'Ver detalhes'}}</md-menu-item>
                            <md-menu-item
                              @click="edit('Service', service.Id, 'Service-Name-edit')"
                            >Editar</md-menu-item>
                          </md-menu-content>
                        </md-menu>
                      </div>
                    </div>
                  </div>
                  <div class="s1-U__pd16">
                    <div class="s1-U__align-children--top s1-U__justify-content--space-between">
                      <p class="s1-U__text-color--dark-2">{{service.Name}}</p>
                      <p
                        class="s1-U__text-color--accent md-subheading"
                      >{{formatMoney(service.ServiceS1Value)}}</p>
                    </div>
                  </div>
                </md-card>
              </div>
            </div>
          </div>
        </div>

        <div v-show="Service.CreationInterface">
          <div
            class="md-layout md-alignment-center-center s1-loc__loading"
            style="position: fixed;top: 0;left: 0;"
            :class="Service.Loading && 'active'"
          >
            <md-progress-spinner md-mode="indeterminate"></md-progress-spinner>
          </div>
          <div class="s1-U__mg--bt32">
            <div class="md-display-1 s1-U__text-color--dark-2 s1-U__align-children--center">
              <md-button
                class="md-dense md-icon-button s1-U__mg--rt16"
                @click="Service.DiscardCreationInterface = true"
              >
                <md-icon>arrow_back</md-icon>
              </md-button>
              <div>
                <h1 class="md-display-1 s1-U__text-color--dark-2 s1-U__align-children--center">
                  <span>Cadastro de serviço</span>
                </h1>
              </div>
            </div>
          </div>
          <md-card>
            <md-content class="md-scrollbar s1-U__pd0 s1-U__pd16" style="overflow: auto">
              <h3
                class="md-title s1-U__text-color--primary s1-U__fw--300 s1-U__mg--bt16 s1-U__mg--tp4"
              >Geral</h3>
              <div class="s1-U__pd--lt16">
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
                  <md-field>
                    <label for="Service-Supplier">Fornecedor</label>
                    <md-select
                      id="Service-Supplier"
                      name="Service-Supplier"
                      v-model="Service.Form.Supplier"
                      required
                    >
                      <md-option
                        v-for="supplier in Supplier.Data"
                        :key="'supplier' + supplier.Id"
                        :value="supplier.Id"
                      >{{supplier.FantasyName}}</md-option>
                    </md-select>
                  </md-field>
                </div>
                <div class="s1-loc__md-field-wrapper s1-U__width--144px">
                  <md-field>
                    <label for="Service-Type">Tipo</label>
                    <md-select
                      id="Service-Type"
                      name="Service-Type"
                      v-model="Service.Form.ServiceType"
                      required
                    >
                      <md-option
                        v-for="serviceType in ServiceTypes"
                        :key="'serviceType' + serviceType.Id"
                        :value="serviceType.Id"
                      >{{serviceType.Name}}</md-option>
                    </md-select>
                  </md-field>
                </div>
                <div class="s1-loc__md-field-wrapper s1-U__mg--tp8 s1-U__mg--bt24">
                  <md-checkbox class="s1-U__mg0" v-model="Service.Form.TimeStemp">Carimbo do tempo</md-checkbox>
                </div>
                <div class="s1-loc__md-field-wrapper s1-U__width--540px">
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
                <div class="s1-loc__md-field-wrapper s1-U__mg--bt24 s1-U__mg--tp8">
                  <p class="s1-U__text-color--dark-2 s1-U__mg--bt16">Distribuição</p>
                  <div
                    class="s1-U__pd--lt16 s1-U__mg--bt8"
                    v-for="distribution in ['Sozinho em um pacote', 'Junto de outros serviços em um pacote', 'Sozinho em um pacote ou junto de outros serviços em um pacote', ]"
                    :key="'distribution-' + distribution"
                  >
                    <md-radio
                      class="s1-U__mg0"
                      v-model="Service.Form.Distribution"
                      :value="distribution"
                    >{{distribution}}</md-radio>
                  </div>
                </div>
              </div>
              <h3
                class="md-title s1-U__text-color--primary s1-U__fw--300 s1-U__mg--bt16 s1-U__mg--tp32"
              >Contratação</h3>
              <div class="s1-U__pd--lt16">
                <div class="s1-loc__md-field-wrapper s1-U__width--210px">
                  <md-field>
                    <label for="Service-ActivationFrequency">Frequência de ativação</label>
                    <md-select
                      id="Service-ActivationFrequency"
                      name="Service-ActivationFrequency"
                      v-model="Service.Form.ActivationFrequency"
                    >
                      <md-option
                        v-for="frequecy in Frequences"
                        :key="'frequecy' + frequecy.Id"
                        :value="frequecy.Id"
                      >{{frequecy.Name}}</md-option>
                    </md-select>
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
                <!-- <div class="s1-loc__md-field-wrapper s1-U__width--160px">
                  <md-field
                    :class="{'md-invalid md-field-helper-text': $v.Service.Form.ServiceCost.$dirty && $v.Service.Form.ServiceCost.$invalid}"
                  >
                    <label for="Service-ServiceCost">Custo fornecedor</label>
                    <md-input
                      id="Service-ServiceCost"
                      name="Service-ServiceCost"
                      type="number"
                      @blur="$v.Service.Form.ServiceCost.$touch()"
                      @focus="$v.Service.Form.ServiceCost.$reset()"
                      v-model="Service.Form.ServiceCost"
                      required
                    ></md-input>
                    <span class="md-error" v-if="!$v.Service.Form.ServiceCost.required">Obrigatório</span>
                  </md-field>
                </div> -->
                <div class="s1-loc__md-field-wrapper s1-U__width--160px">
                  <md-field
                    :class="{'md-invalid md-field-helper-text': $v.Service.Form.ServiceS1Value.$dirty && $v.Service.Form.ServiceS1Value.$invalid}"
                  >
                    <label for="Service-ServiceS1Value">Custo repassado</label>
                    <md-input
                      id="Service-ServiceS1Value"
                      name="Service-ServiceS1Value"
                      type="number"
                      @blur="$v.Service.Form.ServiceS1Value.$touch()"
                      @focus="$v.Service.Form.ServiceS1Value.$reset()"
                      v-model="Service.Form.ServiceS1Value"
                      required
                    ></md-input>
                    <span
                      class="md-error"
                      v-if="!$v.Service.Form.ServiceS1Value.required"
                    >Obrigatório</span>
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
              </div>
              <h3
                class="md-title s1-U__text-color--primary s1-U__fw--300 s1-U__mg--bt16 s1-U__mg--tp32"
              >Favorecidos</h3>
              <div class="s1-U__pd--lt16 s1-U__pd--rt16">
                <table style="border-spacing: 0">
                  <tbody>
                    <tr
                      v-for="(fav, index) in Service.Form.Rules"
                      :key="fav.AppliedTo + '-in-form'"
                    >
                      <td class="s1-U__pd--rt8">
                        <p
                          class="md-body-2 s1-U__flex-shrink-0 s1-U__text-color--dark-2 s1-U__text-align--right"
                        >{{fav.AppliedTo}}:</p>
                      </td>
                      <td
                        class="s1-U__pd--rt8 s1-U__pd--bt8 s1-U__pd--tp8"
                        v-show="Service.FormFavoredVisibility[fav.AppliedTo] && fav.AppliedTo !== 'Titular'"
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
                        v-show="Service.FormFavoredVisibility[fav.AppliedTo]"
                      >
                        <md-field class="s1-md-field--w50px s1-U__mg0">
                          <md-input
                            class="s1-U__text-align--center"
                            id="Service-Value"
                            name="Service-Value"
                            type="number"
                            v-model="Service.Form.Rules[index].Value"
                            @change="(!Service.Form.Rules[index].Value || parseInt(Service.Form.Rules[index].Value) === 0) && Service.FormFavoredVisibility[fav.AppliedTo] ? Service.Form.Rules[index].Value = '1' : null"
                            required
                          ></md-input>
                        </md-field>
                      </td>
                      <td colspan="2" v-show="!Service.FormFavoredVisibility[fav.AppliedTo]">
                        <div class="s1-U__align-children--center">
                          <span
                            class="s1-U__text-color--dark-2 s1-U__pd--rt16 s1-U__flex-shrink-0"
                          >nenhum</span>
                          <md-button
                            class="md-dense s1-U__mg--bt4 md-primary s1-md-bordered"
                            @click="Service.FormFavoredVisibility[fav.AppliedTo] ? Service.Form.Rules[index].Value = '0' : Service.Form.Rules[index].Value = '1'; Service.FormFavoredVisibility[fav.AppliedTo] ? Service.Form.Rules[index].Operator = '=' : null; Service.FormFavoredVisibility[fav.AppliedTo] = !Service.FormFavoredVisibility[fav.AppliedTo]"
                          >
                            <div class="s1-U__align-children--center">
                              <md-icon>{{Service.FormFavoredVisibility[fav.AppliedTo] ? 'close' : 'add'}}</md-icon>
                              <span class="s1-U__mg--lt4">Adicionar</span>
                            </div>
                          </md-button>
                        </div>
                      </td>
                      <td class v-show="Service.FormFavoredVisibility[fav.AppliedTo]">
                        <md-button
                          class="md-dense s1-U__mg--bt4 md-icon-button"
                          @click="Service.FormFavoredVisibility[fav.AppliedTo] ? Service.Form.Rules[index].Value = '0' : Service.Form.Rules[index].Value = '1'; Service.FormFavoredVisibility[fav.AppliedTo] ? Service.Form.Rules[index].Operator = '=' : null; Service.FormFavoredVisibility[fav.AppliedTo] = !Service.FormFavoredVisibility[fav.AppliedTo]"
                          v-if="fav.AppliedTo !== 'Titular'"
                        >
                          <md-icon>{{Service.FormFavoredVisibility[fav.AppliedTo] ? 'close' : 'add'}}</md-icon>
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
                <div
                  v-for="favored in ['Titular', 'Beneficiário', 'Dependente']"
                  :key="favored + '-group'"
                >
                  <h4
                    class="s1-U__text-color--dark-2 md-body-2"
                    v-if="Service.FormFavoredVisibility[favored]"
                  >{{favored}}</h4>
                  <div
                    class="md-layout wrap s1-U__mg--tp4 s1-U__mg--bt16 s1-U__pd16 s1-U__bg-color--body-bg s1-U__border-solid--1"
                    v-if="Service.FormFavoredVisibility[favored]"
                  >
                    <div
                      class="md-layout-item s1-U__pd--bt8 s1-U__pd--rt8 md-xsmall-size-100 md-small-size-50 md-medium-size-50 md-large-size-33 md-xlarge-size-33"
                      v-for="(field, index) in getListByProp(Service.Form.Fields, favored, 'AppliedTo')"
                      :key="field.Id + '-chip'"
                    >
                      <md-card class="s1-U__pd16">
                        <div
                          class="s1-U__mg--bt8 s1-U__align-children--center s1-U__justify-content--space-between s1-U__text-uppercase"
                        >
                          <div class="s1-U__align-children--center">
                            <md-icon class="md-accent">stop</md-icon>
                            <p class="md-caption s1-U__mg--rt4 s1-U__text-color--accent">
                              <b>{{getNameById(Fields, field.Type)}}</b>
                            </p>
                          </div>
                          <md-button
                            class="md-icon-button s1-U__mg--lt4 squared md-dense"
                            @click="removeField(field.Id)"
                            :disabled="index < 2"
                          >
                            <md-icon>
                              <span :class="{'s1-U__invisible' : index < 2}">close</span>
                            </md-icon>
                            <md-tooltip md-direction="left">remover</md-tooltip>
                          </md-button>
                        </div>
                        <div class="s1-loc__md-field-wrapper">
                          <md-field class="s1-U__mg0 s1-U__mg--tp8">
                            <label for>Nome do campo</label>
                            <md-input
                              type="text"
                              @blur="field.Label.length === 0 ? field.Label = getNameById(Fields, field.Type) : null"
                              v-model="field.Label"
                              required
                            ></md-input>
                          </md-field>
                        </div>
                      </md-card>
                    </div>
                    <div
                      class="md-layout-item s1-U__pd--bt8 s1-U__pd--rt8 md-xsmall-size-100 md-small-size-50 md-medium-size-50 md-large-size-33 md-xlarge-size-33"
                      style="min-height: 120px"
                    >
                      <md-menu class="s1-U__full-width s1-U__full-height">
                        <md-button
                          class="md-accent md-icon-button s1-md-bordered squared s1-U__full-width s1-U__full-height md-button-content--full-width"
                          md-menu-trigger
                        >
                          <md-icon style="transform: translateY(-1px)">add</md-icon>
                          <span class="s1-U__mg--lt4">adicionar campo</span>
                        </md-button>

                        <md-menu-content>
                          <md-menu-item
                            v-for="field in Service.FieldOptions"
                            :key="field.Id + '-option-to-add'"
                            @click="addNewField(favored, field.Value, field.Name)"
                          >
                            <span>{{field.Label}}</span>
                            <md-icon>{{ field.Value.length > 1 ? 'apps' : 'stop' }}</md-icon>
                          </md-menu-item>
                        </md-menu-content>
                      </md-menu>
                    </div>
                  </div>
                </div>
              </div>
              <h3
                class="md-title s1-U__text-color--primary s1-U__fw--300 s1-U__mg--bt16 s1-U__mg--tp32"
              >Critérios</h3>
              <div
                class="s1-U__pd--lt16 s1-U__pd--rt16 s1-U__mg--bt32 s1-U__text-color--dark-2"
              >Nenhum critério disponível para configuração.</div>
            </md-content>
            <div class="s1-U__text-align--right s1-U__pd16 s1-U__border--top1 s1-U__flex-shrink-0">
              <md-button
                class="md-primary md-raised"
                :disabled="$v.Service.Form.$invalid"
                @click="saveCreated('Service')"
              >
                <span class="s1-U__pd--lt8 s1-U__pd--rt8">Cadastrar serviço</span>
              </md-button>
            </div>
          </md-card>
        </div>

        <!-- EDIT SERVICE -->
        <div v-show="Service.EditionInterface">
          <div
            class="md-layout md-alignment-center-center s1-loc__loading"
            style="position: fixed;top: 0;left: 0;"
            :class="Service.Loading && 'active'"
          >
            <md-progress-spinner md-mode="indeterminate"></md-progress-spinner>
          </div>
          <div class="s1-U__mg--bt32">
            <div class="md-display-1 s1-U__text-color--dark-2 s1-U__align-children--center">
              <md-button
                class="md-dense md-icon-button s1-U__mg--rt16 s1-U__mg--tp16"
                @click="Service.DiscardEditionInterface = true"
              >
                <md-icon>arrow_back</md-icon>
              </md-button>
              <div v-if="Service.Form.Id && Service.EditionInterface === true">
                <p class="md-caption s1-U__text-uppercase">
                  <span>{{getNameById(Service.Data, Service.Form.Id)}} - {{getPropById(Service.Data, Service.Form.Id, 'FriendlyName')}}</span>
                </p>
                <h1 class="md-display-1 s1-U__text-color--dark-2 s1-U__align-children--center">
                  <span>Edição de serviço</span>
                </h1>
              </div>
            </div>
          </div>
          <md-card>
            <md-content class="md-scrollbar s1-U__pd0 s1-U__pd16" style="overflow: auto">
              <h3
                class="md-title s1-U__text-color--primary s1-U__fw--300 s1-U__mg--bt16 s1-U__mg--tp4"
              >Geral</h3>
              <div class="s1-U__pd--lt16">
                <div class="s1-loc__md-field-wrapper s1-U__width--210px">
                  <md-field
                    :md-counter="false"
                    :class="{'md-invalid md-field-helper-text': $v.Service.Form.Name.$dirty && $v.Service.Form.Name.$invalid}"
                  >
                    <label for="Service-Name-edit">Nome</label>
                    <md-input
                      id="Service-Name-edit"
                      name="Service-Name-edit"
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
                    <label for="Service-FriendlyName-edit">Nome camarada</label>
                    <md-input
                      id="Service-FriendlyName-edit"
                      name="Service-FriendlyName-edit"
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
                  <md-field>
                    <label for="Service-Supplier-edit">Fornecedor</label>
                    <md-select
                      id="Service-Supplier-edit"
                      name="Service-Supplier-edit"
                      v-model="Service.Form.Supplier"
                      required
                    >
                      <md-option
                        v-for="supplier in Supplier.Data"
                        :key="'supplier' + supplier.Id"
                        :value="supplier.Id"
                      >{{supplier.FantasyName}}</md-option>
                    </md-select>
                  </md-field>
                </div>
                <div class="s1-loc__md-field-wrapper s1-U__width--144px">
                  <md-field>
                    <label for="Service-Type-edit">Tipo</label>
                    <md-select
                      id="Service-Type-edit"
                      name="Service-Type-edit"
                      v-model="Service.Form.ServiceType"
                      required
                    >
                      <md-option
                        v-for="serviceType in ServiceTypes"
                        :key="'serviceType' + serviceType.Id"
                        :value="serviceType.Id"
                      >{{serviceType.Name}}</md-option>
                    </md-select>
                  </md-field>
                </div>
                <div class="s1-loc__md-field-wrapper s1-U__mg--tp8 s1-U__mg--bt24">
                  <md-checkbox class="s1-U__mg0" v-model="Service.Form.TimeStemp">Carimbo do tempo</md-checkbox>
                </div>
                <div class="s1-loc__md-field-wrapper s1-U__width--540px">
                  <md-field>
                    <label for="Service-Description-edit">Descrição</label>
                    <md-textarea
                      id="Service-Description-edit"
                      name="Service-Description-edit"
                      v-model="Service.Form.Description"
                      md-autogrow
                    ></md-textarea>
                  </md-field>
                </div>
                <div class="s1-loc__md-field-wrapper s1-U__mg--bt24 s1-U__mg--tp8">
                  <p class="s1-U__text-color--dark-2 s1-U__mg--bt16">Distribuição</p>
                  <div
                    class="s1-U__pd--lt16 s1-U__mg--bt8"
                    v-for="distribution in ['Sozinho em um pacote', 'Junto de outros serviços em um pacote', 'Sozinho em um pacote ou junto de outros serviços em um pacote', ]"
                    :key="'distribution-' + distribution"
                  >
                    <md-radio
                      class="s1-U__mg0"
                      v-model="Service.Form.Distribution"
                      :value="distribution"
                    >{{distribution}}</md-radio>
                  </div>
                </div>
              </div>
              <h3
                class="md-title s1-U__text-color--primary s1-U__fw--300 s1-U__mg--bt16 s1-U__mg--tp32"
              >Contratação</h3>
              <div class="s1-U__pd--lt16">
                <div class="s1-loc__md-field-wrapper s1-U__width--210px">
                  <md-field>
                    <label for="Service-ActivationFrequency-edit">Frequência de ativação</label>
                    <md-select
                      id="Service-ActivationFrequency-edit"
                      name="Service-ActivationFrequency-edit"
                      v-model="Service.Form.ActivationFrequency"
                    >
                      <md-option
                        v-for="frequecy in Frequences"
                        :key="'frequecy' + frequecy.Id"
                        :value="frequecy.Id"
                      >{{frequecy.Name}}</md-option>
                    </md-select>
                  </md-field>
                </div>
                <div class="s1-loc__md-field-wrapper s1-U__width--180px">
                  <md-field>
                    <label for="Service-CurrencyCode-edit">Moeda</label>
                    <md-select
                      id="Service-CurrencyCode-edit"
                      name="Service-CurrencyCode-edit"
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
                <!-- <div class="s1-loc__md-field-wrapper s1-U__width--160px">
                  <md-field
                    :class="{'md-invalid md-field-helper-text': $v.Service.Form.ServiceCost.$dirty && $v.Service.Form.ServiceCost.$invalid}"
                  >
                    <label for="Service-ServiceCost-edit">Custo fornecedor</label>
                    <md-input
                      id="Service-ServiceCost-edit"
                      name="Service-ServiceCost-edit"
                      type="number"
                      @blur="$v.Service.Form.ServiceCost.$touch()"
                      @focus="$v.Service.Form.ServiceCost.$reset()"
                      v-model="Service.Form.ServiceCost"
                      required
                    ></md-input>
                    <span class="md-error" v-if="!$v.Service.Form.ServiceCost.required">Obrigatório</span>
                  </md-field>
                </div> -->
                <div class="s1-loc__md-field-wrapper s1-U__width--160px">
                  <md-field
                    :class="{'md-invalid md-field-helper-text': $v.Service.Form.ServiceS1Value.$dirty && $v.Service.Form.ServiceS1Value.$invalid}"
                  >
                    <label for="Service-ServiceS1Value-edit">Custo repassado</label>
                    <md-input
                      id="Service-ServiceS1Value-edit"
                      name="Service-ServiceS1Value-edit"
                      type="number"
                      @blur="$v.Service.Form.ServiceS1Value.$touch()"
                      @focus="$v.Service.Form.ServiceS1Value.$reset()"
                      v-model="Service.Form.ServiceS1Value"
                      required
                    ></md-input>
                    <span
                      class="md-error"
                      v-if="!$v.Service.Form.ServiceS1Value.required"
                    >Obrigatório</span>
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
                        id="Service-Vigence-edit"
                        name="Service-Vigence-edit"
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
              </div>
              <h3
                class="md-title s1-U__text-color--primary s1-U__fw--300 s1-U__mg--bt16 s1-U__mg--tp32"
              >Favorecidos</h3>
              <div class="s1-U__pd--lt16 s1-U__pd--rt16">
                <table style="border-spacing: 0">
                  <tbody>
                    <tr
                      v-for="(fav, index) in Service.Form.Rules"
                      :key="fav.AppliedTo + '-in-form'"
                    >
                      <td class="s1-U__pd--rt8">
                        <p
                          class="md-body-2 s1-U__flex-shrink-0 s1-U__text-color--dark-2 s1-U__text-align--right"
                        >{{fav.AppliedTo}}:</p>
                      </td>
                      <td
                        class="s1-U__pd--rt8 s1-U__pd--bt8 s1-U__pd--tp8"
                        v-show="Service.FormFavoredVisibility[fav.AppliedTo] && fav.AppliedTo !== 'Titular'"
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
                        v-show="Service.FormFavoredVisibility[fav.AppliedTo]"
                      >
                        <md-field class="s1-md-field--w50px s1-U__mg0">
                          <md-input
                            class="s1-U__text-align--center"
                            id="Service-Value"
                            name="Service-Value"
                            type="number"
                            v-model="Service.Form.Rules[index].Value"
                            @change="(!Service.Form.Rules[index].Value || parseInt(Service.Form.Rules[index].Value) === 0) && Service.FormFavoredVisibility[fav.AppliedTo] ? Service.Form.Rules[index].Value = '1' : null"
                            required
                          ></md-input>
                        </md-field>
                      </td>
                      <td colspan="2" v-show="!Service.FormFavoredVisibility[fav.AppliedTo]">
                        <div class="s1-U__align-children--center">
                          <span
                            class="s1-U__text-color--dark-2 s1-U__pd--rt16 s1-U__flex-shrink-0"
                          >nenhum</span>
                          <md-button
                            class="md-dense s1-U__mg--bt4 md-primary s1-md-bordered"
                            @click="Service.FormFavoredVisibility[fav.AppliedTo] ? Service.Form.Rules[index].Value = '0' : Service.Form.Rules[index].Value = '1'; Service.FormFavoredVisibility[fav.AppliedTo] ? Service.Form.Rules[index].Operator = '=' : null; Service.FormFavoredVisibility[fav.AppliedTo] = !Service.FormFavoredVisibility[fav.AppliedTo]"
                          >
                            <div class="s1-U__align-children--center">
                              <md-icon>{{Service.FormFavoredVisibility[fav.AppliedTo] ? 'close' : 'add'}}</md-icon>
                              <span class="s1-U__mg--lt4">Adicionar</span>
                            </div>
                          </md-button>
                        </div>
                      </td>
                      <td class v-show="Service.FormFavoredVisibility[fav.AppliedTo]">
                        <md-button
                          class="md-dense s1-U__mg--bt4 md-icon-button"
                          @click="Service.FormFavoredVisibility[fav.AppliedTo] ? Service.Form.Rules[index].Value = '0' : Service.Form.Rules[index].Value = '1'; Service.FormFavoredVisibility[fav.AppliedTo] ? Service.Form.Rules[index].Operator = '=' : null; Service.FormFavoredVisibility[fav.AppliedTo] = !Service.FormFavoredVisibility[fav.AppliedTo]"
                          v-if="fav.AppliedTo !== 'Titular'"
                        >
                          <md-icon>{{Service.FormFavoredVisibility[fav.AppliedTo] ? 'close' : 'add'}}</md-icon>
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
                <div
                  v-for="favored in ['Titular', 'Beneficiário', 'Dependente']"
                  :key="favored + '-group'"
                >
                  <h4
                    class="s1-U__text-color--dark-2 md-body-2"
                    v-if="Service.FormFavoredVisibility[favored]"
                  >{{favored}}</h4>
                  <div
                    class="md-layout wrap s1-U__mg--tp4 s1-U__mg--bt16 s1-U__pd16 s1-U__bg-color--body-bg s1-U__border-solid--1"
                    v-if="Service.FormFavoredVisibility[favored]"
                  >
                    <div
                      class="md-layout-item s1-U__pd--bt8 s1-U__pd--rt8 md-xsmall-size-100 md-small-size-50 md-medium-size-50 md-large-size-33 md-xlarge-size-33"
                      v-for="(field, index) in getListByProp(Service.Form.Fields, favored, 'AppliedTo')"
                      :key="field.Id + '-chip'"
                    >
                      <md-card class="s1-U__pd16">
                        <div
                          class="s1-U__mg--bt8 s1-U__align-children--center s1-U__justify-content--space-between s1-U__text-uppercase"
                        >
                          <div class="s1-U__align-children--center">
                            <md-icon class="md-accent">stop</md-icon>
                            <p class="md-caption s1-U__mg--rt4 s1-U__text-color--accent">
                              <b>{{getNameById(Fields, field.Type)}}</b>
                            </p>
                          </div>
                          <md-button
                            class="md-icon-button s1-U__mg--lt4 squared md-dense"
                            @click="removeField(field.Id)"
                            :disabled="index < 2"
                          >
                            <md-icon>
                              <span :class="{'s1-U__invisible' : index < 2}">close</span>
                            </md-icon>
                            <md-tooltip md-direction="left">remover</md-tooltip>
                          </md-button>
                        </div>
                        <div class="s1-loc__md-field-wrapper">
                          <md-field class="s1-U__mg0 s1-U__mg--tp8">
                            <label for>Nome do campo</label>
                            <md-input
                              type="text"
                              @blur="field.Label.length === 0 ? field.Label = getNameById(Fields, field.Type) : null"
                              v-model="field.Label"
                              required
                            ></md-input>
                          </md-field>
                        </div>
                      </md-card>
                    </div>
                    <div
                      class="md-layout-item s1-U__pd--bt8 s1-U__pd--rt8 md-xsmall-size-100 md-small-size-50 md-medium-size-50 md-large-size-33 md-xlarge-size-33"
                      style="min-height: 120px"
                    >
                      <md-menu class="s1-U__full-width s1-U__full-height">
                        <md-button
                          class="md-accent md-icon-button s1-md-bordered squared s1-U__full-width s1-U__full-height md-button-content--full-width"
                          md-menu-trigger
                        >
                          <md-icon style="transform: translateY(-1px)">add</md-icon>
                          <span class="s1-U__mg--lt4">adicionar campo</span>
                        </md-button>

                        <md-menu-content>
                          <md-menu-item
                            v-for="field in Service.FieldOptions"
                            :key="field.Id + '-option-to-add'"
                            @click="addNewField(favored, field.Value, field.Name)"
                          >
                            <span>{{field.Label}}</span>
                            <md-icon>{{ field.Value.length > 1 ? 'apps' : 'stop' }}</md-icon>
                          </md-menu-item>
                        </md-menu-content>
                      </md-menu>
                    </div>
                  </div>
                </div>
              </div>
              <h3
                class="md-title s1-U__text-color--primary s1-U__fw--300 s1-U__mg--bt16 s1-U__mg--tp32"
              >Critérios</h3>
              <div
                class="s1-U__pd--lt16 s1-U__pd--rt16 s1-U__mg--bt32 s1-U__text-color--dark-2"
              >Nenhum critério disponível para configuração.</div>
            </md-content>
            <div class="s1-U__text-align--right s1-U__pd16 s1-U__border--top1 s1-U__flex-shrink-0">
              <md-button
                class="md-primary md-raised"
                :disabled="$v.Service.Form.$invalid"
                @click="saveEdited('Service')"
              >
                <span class="s1-U__pd--lt8 s1-U__pd--rt8">Salvar</span>
              </md-button>
            </div>
          </md-card>
        </div>

        <!-- SERVICE DETAILS -->
        <div
          class="s1-mezzanine-wrapper s1-U__full-height s1-U__bg-color--white"
          :class="{'active' : Service.ShowServiceDetails}"
        >
          <div class="s1-mezzanine" :class="{'active' : Service.ShowServiceDetails}">
            <md-card class="s1-U__full-height">
              <div
                class="s1-U__border--bottom1 s1-U__align-children--top s1-U__full-width s1-U__justify-content--space-between"
              >
                <div class="s1-U__pd16 s1-U__flex-shrink-0 s1-U__width--240px">
                  <h2 class="md-title s1-U__text-ellipsis">{{Service.DetailedService.FriendlyName}}</h2>
                  <p
                    class="md-subheading s1-U__text-color--dark-2 s1-U__text-ellipsis"
                  >{{Service.DetailedService.Name}}</p>
                </div>
                <md-button
                  class="md-icon-button s1-U__flex-shrink-0 s1-U__mg--tp8 s1-U__mg--rt8"
                  @click="closeAndClearServiceDetails()"
                >
                  <md-icon>close</md-icon>
                </md-button>
              </div>
              <md-card-content>
                <md-content
                  class="md-scrollbar s1-U__pd16"
                  style="overflow: auto;"
                  v-if="Service.DetailedService.Id"
                >
                  <div
                    class="s1-U__pd--lt16 s1-U__mg--bt24 s1-U__align-children--center s1-U__full-width"
                  >
                    <div
                      class="s1-U__bg-color--accent s1-U__border-radius--5px s1-U__align-children--center s1-U__pd8"
                      v-if="Service.DetailedService.TimeStemp"
                    >
                      <md-icon>
                        <span class="s1-U__text-color--white">schedule</span>
                      </md-icon>
                      <p
                        class="s1-U__pd--rt8 s1-U__pd--lt8 s1-U__text-color--white"
                      >Carimbo do tempo ativado</p>
                    </div>
                    <div
                      class="s1-U__bg-color--body-bg s1-U__border-radius--5px s1-U__align-children--center s1-U__pd8"
                      v-if="!Service.DetailedService.TimeStemp"
                    >
                      <md-icon>
                        <span class="s1-U__text-color--dark-2">schedule</span>
                      </md-icon>
                      <p
                        class="s1-U__pd--rt8 s1-U__pd--lt8 s1-U__text-color--dark-2"
                      >Sem carimbo do tempo</p>
                    </div>
                  </div>
                  <div class="s1-U__pd--lt16 s1-U__mg--bt16">
                    <p class="md-caption">Tipo</p>
                    <p
                      class="s1-U__text-ellipsis"
                    >{{getNameById(ServiceTypes ,Service.DetailedService.ServiceType)}}</p>
                  </div>
                  <div class="s1-U__pd--lt16 s1-U__mg--bt16">
                    <p class="md-caption">Fornecedor</p>
                    <p
                      class="s1-U__text-ellipsis"
                    >{{getNameById(Supplier.Data ,Service.DetailedService.Supplier)}}</p>
                  </div>
                  <h3
                    class="md-title s1-U__mg--bt16 s1-U__mg--tp32 s1-U__text-color--primary"
                  >Distribuição</h3>
                  <div class="s1-U__pd--lt16 s1-U__mg--bt16 s1-U__align-children--top">
                    <md-icon class="s1-U__mg--rt8" style="transform: translateY(-1px)">
                      <span class="s1-U__text-color--dark-3">error</span>
                    </md-icon>
                    <p>{{Service.DetailedService.Distribution}}</p>
                  </div>
                  <h3
                    class="md-title s1-U__mg--bt16 s1-U__mg--tp32 s1-U__text-color--primary"
                  >Descrição</h3>
                  <div class="s1-U__pd--lt16 s1-U__mg--bt16">
                    <p class>{{Service.DetailedService.Description}}</p>
                  </div>
                  <h3
                    class="md-title s1-U__mg--bt16 s1-U__mg--tp32 s1-U__text-color--primary"
                  >Contratação</h3>
                  <div class="s1-U__pd--lt16 s1-U__mg--bt16">
                    <p class="md-caption">Frequência de ativação</p>
                    <p
                      class="s1-U__text-ellipsis"
                    >{{ getNameById(Frequences, Service.DetailedService.ActivationFrequency)}}</p>
                  </div>
                  <div class="s1-U__pd--lt16 s1-U__mg--bt16">
                    <p class="md-caption">Vigência</p>
                    <p class="s1-U__text-ellipsis">{{Service.DetailedService.Vigence}} dias</p>
                  </div>
                  <!-- <div class="s1-U__pd--lt16 s1-U__mg--bt16">
                    <p class="md-caption">Custo</p>
                    <p
                      class="s1-U__text-ellipsis"
                    >{{formatMoney(Service.DetailedService.ServiceCost)}}</p>
                  </div> -->
                  <div class="s1-U__pd--lt16 s1-U__mg--bt16">
                    <p class="md-caption">Valor</p>
                    <p
                      class="s1-U__text-ellipsis"
                    >{{formatMoney(Service.DetailedService.ServiceS1Value)}}</p>
                  </div>
                  <h3
                    class="md-title s1-U__mg--bt16 s1-U__mg--tp32 s1-U__text-color--primary"
                  >Informações requeridas</h3>
                  <div class="s1-U__pd--lt16 s1-U__mg--bt16">
                    <p class="md-caption">Titular</p>
                    <div class="s1-chip-wrapper--left">
                      <md-chip
                        v-for="field in getListByProp(Service.DetailedService.Fields, 'Titular', 'AppliedTo')"
                        :key="field.Id + '-fieldzera-' + field.AppliedTo"
                      >{{field.Label}}</md-chip>
                    </div>
                  </div>
                  <div
                    class="s1-U__pd--lt16 s1-U__mg--bt16"
                    v-if="Service.DetailedService.Rules[1].Value > 0"
                  >
                    <p class="md-caption">Beneficiário</p>
                    <div class="s1-chip-wrapper--left">
                      <md-chip
                        v-for="field in getListByProp(Service.DetailedService.Fields, 'Beneficiário', 'AppliedTo')"
                        :key="field.Id + '-fieldzera-' + field.AppliedTo"
                      >{{field.Label}}</md-chip>
                    </div>
                  </div>
                  <div
                    class="s1-U__pd--lt16 s1-U__mg--bt16"
                    v-if="Service.DetailedService.Rules[2].Value > 0"
                  >
                    <p class="md-caption">Dependente</p>
                    <div class="s1-chip-wrapper--left">
                      <md-chip
                        v-for="field in getListByProp(Service.DetailedService.Fields, 'Dependente', 'AppliedTo')"
                        :key="field.Id + '-fieldzera-' + field.AppliedTo"
                      >{{field.Label}}</md-chip>
                    </div>
                  </div>
                </md-content>
              </md-card-content>
            </md-card>
          </div>
        </div>

        <md-dialog-confirm
          :md-active.sync="Service.DiscardCreationInterface"
          md-title="Descartar cadastro?"
          md-content="Ao sair, as informações do serviço em cadastro serão descartadas"
          md-confirm-text="descartar"
          md-cancel-text="voltar"
          @md-cancel="Service.DiscardCreationInterface = false"
          @md-confirm="discardCreation('Service')"
        />

        <md-dialog-confirm
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
    <div v-if="Settings.activePage === 'allPackages'">
      <div
        class="s1-U__width--900px s1-U__pd16"
        style="margin: 0 auto;"
        v-show="!Package.CreationInterface && !Package.EditionInterface"
      >
        <div class="md-layout md-alignment-center-space-between s1-U__full-width s1-U__mg--bt32">
          <div class="md-layout-item">
            <div class="md-display-1 s1-U__text-color--dark-2 s1-U__align-children--center">
              <md-button class="md-dense md-icon-button s1-U__mg--rt16">
                <md-icon>arrow_back</md-icon>
              </md-button>
              <div>
                <h1 class="md-display-1 s1-U__text-color--dark-2">
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
        <div class="s1-U__pd--lt20" v-else>
          <div class="md-layout md-gutter">
            <div class="md-layout md-gutter">
              <div
                class="md-layout-item md-xsmall-size-100 md-medium-size-50 md-size-33 s1-U__mg--bt20"
                v-for="pack in Package.Data"
                :key="'Package-' + pack.Id"
              >
                <md-card>
                  <div class="s1-U__pd--lt16 s1-U__pd--rt16 s1-U__pd--tp16">
                    <span class="md-caption">
                      {{getNameById(Accounts, pack.TenantId)}}
                      <md-tooltip md-direction="right">Conta</md-tooltip>
                    </span>
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
                        <span>{{getPropById(Service.Data, service, 'FriendlyName')}}</span>
                      </li>
                      <li v-if="getXItems(pack.Services, Package.moreQty).rest.length > 0">
                        <span>
                          <span>+ {{getXItems(pack.Services, Package.moreQty).rest.length}}</span>
                          <md-tooltip md-direction="right">
                            <span
                              v-for="(rest, index) in getXItems(pack.Services, Package.moreQty).rest"
                              :key="rest"
                            >{{getPropById(Service.Data, rest, 'FriendlyName')}} {{ index === (getXItems(pack.Services, Package.moreQty).rest.length - 1) ? '' : ', ' }}</span>
                          </md-tooltip>
                        </span>
                      </li>
                    </ul>
                  </div>
                  <div class="s1-U__align-children--center s1-U__pd--lt16 s1-U__pd--rt16">
                    <p
                      class="md-body-2"
                      :class="pack.Active ? 's1-loc__text-color--success' : 's1-U__text-color--dark-3'"
                    >{{pack.Active ? 'Ativo' : 'Inativo'}} para {{ pack.Purpose === 'Sale' ? 'venda' : 'benefício' }}</p>
                  </div>
                  <p class="s1-U__text-align--right s1-U__pd--rt16">
                    <span class="md-caption s1-U__text-color--dark-3">
                      <b>{{formatMoney(pack.ServicesServiceS1Value)}}</b>
                      <md-tooltip md-direction="left">Custo fornecedor</md-tooltip>
                    </span>
                  </p>
                  <div
                    class="s1-U__align-children--center s1-U__pd--lt16 s1-U__pd--rt16 s1-U__pd--bt16"
                  >
                    <div class="s1-U__full-width">
                      <md-button
                        class="md-icon-button md-dense s1-md-bordered squared"
                        @click="Package.IdToSwitchActive = pack.Id; Package.ConfirmSwitchActive = true;"
                      >
                        <md-icon>{{getObjByProp(Package.Data, pack.Id, 'Id').Active ? 'block' : 'check'}}</md-icon>
                        <md-tooltip
                          md-direction="left"
                        >{{getObjByProp(Package.Data, pack.Id, 'Id').Active ? 'Inativar pacote' : 'Ativar pacote'}}</md-tooltip>
                      </md-button>
                      <md-button
                        class="md-icon-button md-dense s1-md-bordered squared s1-U__mg--lt4"
                        @click="edit('Package', pack.Id, 'Package-edit-Name')"
                      >
                        <md-icon>edit</md-icon>
                        <md-tooltip md-direction="right">Editar</md-tooltip>
                      </md-button>
                      <md-button
                        class="md-icon-button md-dense s1-md-bordered squared s1-U__mg--lt4"
                        @click="newByClone('Package', pack, 'Package-Name')"
                      >
                        <md-icon>file_copy</md-icon>
                        <md-tooltip md-direction="right">Clonar</md-tooltip>
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

      <md-dialog-confirm
        v-if="Package.IdToSwitchActive"
        :md-active.sync="Package.ConfirmSwitchActive"
        :md-title="`${getObjByProp(Package.Data, Package.IdToSwitchActive, 'Id').Active ? 'Inativar' : 'Ativar'} pacote?`"
        :md-content="`Alterar o estado do pacote ${getObjByProp(Package.Data, Package.IdToSwitchActive, 'Id').Name}?`"
        :md-confirm-text="`${getObjByProp(Package.Data, Package.IdToSwitchActive, 'Id').Active ? 'Inativar' : 'Ativar'}`"
        md-cancel-text="voltar"
        @md-cancel="Package.ConfirmSwitchActive = false; IdToSwitchActive = null"
        @md-confirm="getObjByProp(Package.Data, Package.IdToSwitchActive, 'Id').Active = !getObjByProp(Package.Data, Package.IdToSwitchActive, 'Id').Active"
      />
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
                class="md-dense md-icon-button s1-U__mg--rt16"
                @click="Package.DiscardCreationInterface = true"
              >
                <md-icon>arrow_back</md-icon>
              </md-button>
              <div>
                <h1 class="md-display-1 s1-U__text-color--dark-2 s1-U__align-children--center">
                  <span>Cadastro de pacote</span>
                </h1>
              </div>
            </div>
          </div>
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
                <div class="s1-loc__md-field-wrapper s1-U__mg--bt24 s1-U__mg--tp8">
                  <p class="s1-U__text-color--dark-2 s1-U__mg--bt16">Propósito</p>
                  <div class="s1-U__pd--lt16 s1-U__mg--bt8">
                    <md-radio class="s1-U__mg0" v-model="Package.Form.Purpose" value="Sale">Venda</md-radio>
                  </div>
                  <div class="s1-U__pd--lt16">
                    <md-radio class="s1-U__mg0" v-model="Package.Form.Purpose" value="Ben">Benefício</md-radio>
                  </div>
                </div>
              </div>
            </section>
            <section class="s1-U__mg--bt64">
              <h3
                class="md-title s1-U__text-color--primary s1-U__fw--300 s1-U__mg--bt16"
              >Portifólio de afinidades</h3>
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
                      >{{getPropById(Service.Data, service, 'FriendlyName')}}</span>
                      <div class="s1-U__align-children--center">
                        <span
                          class="md-body-2 s1-U__text-color--accent s1-U__mg--rt8 s1-U__flex-shrink-0"
                        >{{formatMoney(getPropById(Service.Data, service, 'ServiceS1Value'))}}</span>
                        <md-button
                          class="md-dense s1-md-bordered s1-U__flex-shrink-0"
                          @click="setShowServiceDetail(getObjByProp(Service.Data, service, 'Id'))"
                        >{{getPropById(Service.Data, service, "Id") === Package.DetailedService.Id ? 'fechar detalhes' : 'ver detalhes'}}</md-button>
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
            <section class="s1-U__mg--bt64" v-show="Package.Form.Purpose === 'Sale'">
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
                    <b>{{formatMoney(getServicesServiceS1Value())}}</b>
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
          </md-card-content>
          <md-card-actions class="s1-U__pd16 s1-U__border--top1">
            <md-button
              class="md-primary md-raised"
              @click="saveCreated('Package')"
              :disabled="$v.Package.Form.$invalid"
            >Cadastrar pacote</md-button>
          </md-card-actions>
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
                        {{formatMoney(service.ServiceS1Value)}}
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
                        <span class="s1-U__mg--lt16">{{formatMoney(service.ServiceS1Value)}}</span>
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
                      <h2
                        class="md-title s1-U__text-ellipsis"
                      >{{Package.DetailedService.FriendlyName}}</h2>
                      <p
                        class="md-subheading s1-U__text-color--dark-2 s1-U__text-ellipsis"
                      >{{Package.DetailedService.Name}}</p>
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
                      <div
                        class="s1-U__pd--lt16 s1-U__mg--bt24 s1-U__align-children--center s1-U__full-width"
                      >
                        <div
                          class="s1-U__bg-color--accent s1-U__border-radius--5px s1-U__align-children--center s1-U__pd8"
                          v-if="Package.DetailedService.TimeStemp"
                        >
                          <md-icon>
                            <span class="s1-U__text-color--white">schedule</span>
                          </md-icon>
                          <p
                            class="s1-U__pd--rt8 s1-U__pd--lt8 s1-U__text-color--white"
                          >Carimbo do tempo ativado</p>
                        </div>
                        <div
                          class="s1-U__bg-color--body-bg s1-U__border-radius--5px s1-U__align-children--center s1-U__pd8"
                          v-if="!Package.DetailedService.TimeStemp"
                        >
                          <md-icon>
                            <span class="s1-U__text-color--dark-2">schedule</span>
                          </md-icon>
                          <p
                            class="s1-U__pd--rt8 s1-U__pd--lt8 s1-U__text-color--dark-2"
                          >Sem carimbo do tempo</p>
                        </div>
                      </div>
                      <div class="s1-U__pd--lt16 s1-U__mg--bt16">
                        <p class="md-caption">Tipo</p>
                        <p
                          class="s1-U__text-ellipsis"
                        >{{getNameById(ServiceTypes ,Package.DetailedService.ServiceType)}}</p>
                      </div>
                      <div class="s1-U__pd--lt16 s1-U__mg--bt16">
                        <p class="md-caption">Fornecedor</p>
                        <p
                          class="s1-U__text-ellipsis"
                        >{{getNameById(Supplier.Data ,Package.DetailedService.Supplier)}}</p>
                      </div>
                      <h3
                        class="md-title s1-U__mg--bt16 s1-U__mg--tp32 s1-U__text-color--primary"
                      >Distribuição</h3>
                      <div class="s1-U__pd--lt16 s1-U__mg--bt16 s1-U__align-children--top">
                        <md-icon class="s1-U__mg--rt8" style="transform: translateY(-1px)">
                          <span class="s1-U__text-color--dark-3">error</span>
                        </md-icon>
                        <p>{{Package.DetailedService.Distribution}}</p>
                      </div>
                      <h3
                        class="md-title s1-U__mg--bt16 s1-U__mg--tp32 s1-U__text-color--primary"
                      >Descrição</h3>
                      <div class="s1-U__pd--lt16 s1-U__mg--bt16">
                        <p class>{{Package.DetailedService.Description}}</p>
                      </div>
                      <h3
                        class="md-title s1-U__mg--bt16 s1-U__mg--tp32 s1-U__text-color--primary"
                      >Contratação</h3>
                      <div class="s1-U__pd--lt16 s1-U__mg--bt16">
                        <p class="md-caption">Frequência de ativação</p>
                        <p
                          class="s1-U__text-ellipsis"
                        >{{ getNameById(Frequences, Package.DetailedService.ActivationFrequency)}}</p>
                      </div>
                      <div class="s1-U__pd--lt16 s1-U__mg--bt16">
                        <p class="md-caption">Vigência</p>
                        <p class="s1-U__text-ellipsis">{{Package.DetailedService.Vigence}} dias</p>
                      </div>
                      <!-- <div class="s1-U__pd--lt16 s1-U__mg--bt16">
                        <p class="md-caption">Custo</p>
                        <p
                          class="s1-U__text-ellipsis"
                        >{{formatMoney(Package.DetailedService.ServiceCost)}}</p>
                      </div> -->
                      <div class="s1-U__pd--lt16 s1-U__mg--bt16">
                        <p class="md-caption">Valor</p>
                        <p
                          class="s1-U__text-ellipsis"
                        >{{formatMoney(Package.DetailedService.ServiceS1Value)}}</p>
                      </div>
                      <h3
                        class="md-title s1-U__mg--bt16 s1-U__mg--tp32 s1-U__text-color--primary"
                      >Informações requeridas</h3>
                      <div class="s1-U__pd--lt16 s1-U__mg--bt16">
                        <p class="md-caption">Titular</p>
                        <div class="s1-chip-wrapper--left">
                          <md-chip
                            v-for="field in getListByProp(Package.DetailedService.Fields, 'Titular', 'AppliedTo')"
                            :key="field.Id + '-fieldzera-' + field.AppliedTo"
                          >{{field.Label}}</md-chip>
                        </div>
                      </div>
                      <div
                        class="s1-U__pd--lt16 s1-U__mg--bt16"
                        v-if="Package.DetailedService.Rules[1].Value > 0"
                      >
                        <p class="md-caption">Beneficiário</p>
                        <div class="s1-chip-wrapper--left">
                          <md-chip
                            v-for="field in getListByProp(Package.DetailedService.Fields, 'Beneficiário', 'AppliedTo')"
                            :key="field.Id + '-fieldzera-' + field.AppliedTo"
                          >{{field.Label}}</md-chip>
                        </div>
                      </div>
                      <div
                        class="s1-U__pd--lt16 s1-U__mg--bt16"
                        v-if="Package.DetailedService.Rules[2].Value > 0"
                      >
                        <p class="md-caption">Dependente</p>
                        <div class="s1-chip-wrapper--left">
                          <md-chip
                            v-for="field in getListByProp(Package.DetailedService.Fields, 'Dependente', 'AppliedTo')"
                            :key="field.Id + '-fieldzera-' + field.AppliedTo"
                          >{{field.Label}}</md-chip>
                        </div>
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
          <div class="md-display-1 s1-U__text-color--dark-2 s1-U__align-children--center">
            <md-button
              class="md-dense md-icon-button s1-U__mg--rt16"
              @click="Package.DiscardEditionInterface = true"
            >
              <md-icon>arrow_back</md-icon>
            </md-button>
            <div v-if="Package.Form.Id && Package.EditionInterface === true">
              <p class="md-caption s1-U__text-uppercase">
                <span>{{getNameById(Package.Data, Package.Form.Id)}}</span>
              </p>
              <h1 class="md-display-1 s1-U__text-color--dark-2 s1-U__align-children--center">
                <span>Edição de pacote</span>
              </h1>
            </div>
          </div>
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
                <div class="s1-loc__md-field-wrapper s1-U__mg--bt24 s1-U__mg--tp8">
                  <p class="s1-U__text-color--dark-2 s1-U__mg--bt16">Propósito</p>
                  <div class="s1-U__pd--lt16 s1-U__mg--bt8">
                    <md-radio class="s1-U__mg0" v-model="Package.Form.Purpose" value="Sale">Venda</md-radio>
                  </div>
                  <div class="s1-U__pd--lt16">
                    <md-radio class="s1-U__mg0" v-model="Package.Form.Purpose" value="Ben">Benefício</md-radio>
                  </div>
                </div>
              </div>
            </section>
            <section class="s1-U__mg--bt64">
              <h3
                class="md-title s1-U__text-color--primary s1-U__fw--300 s1-U__mg--bt16"
              >Portifólio de afinidades</h3>
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
                      >{{getPropById(Service.Data, service, 'FriendlyName')}}</span>
                      <div class="s1-U__align-children--center">
                        <span
                          class="md-body-2 s1-U__text-color--accent s1-U__mg--rt8 s1-U__flex-shrink-0"
                        >{{formatMoney(getPropById(Service.Data, service, 'ServiceS1Value'))}}</span>
                        <md-button
                          class="md-dense s1-md-bordered s1-U__flex-shrink-0"
                          @click="setShowServiceDetail(getObjByProp(Service.Data, service, 'Id'))"
                        >{{getPropById(Service.Data, service, "Id") === Package.DetailedService.Id ? 'fechar detalhes' : 'ver detalhes'}}</md-button>
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
            <section class="s1-U__mg--bt64" v-show="Package.Form.Purpose === 'Sale'">
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
                    <b>{{formatMoney(getServicesServiceS1Value())}}</b>
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
          </md-card-content>
          <md-card-actions class="s1-U__pd16 s1-U__border--top1">
            <md-button
              class="md-primary md-raised"
              @click="saveEdited('Package')"
              :disabled="$v.Package.Form.$invalid"
            >Salvar</md-button>
          </md-card-actions>
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
                        {{formatMoney(service.ServiceS1Value)}}
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
                        <span class="s1-U__mg--lt16">{{formatMoney(service.ServiceS1Value)}}</span>
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
                      <h2
                        class="md-title s1-U__text-ellipsis"
                      >{{Package.DetailedService.FriendlyName}}</h2>
                      <p
                        class="md-subheading s1-U__text-color--dark-2 s1-U__text-ellipsis"
                      >{{Package.DetailedService.Name}}</p>
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
                      <div
                        class="s1-U__pd--lt16 s1-U__mg--bt24 s1-U__align-children--center s1-U__full-width"
                      >
                        <div
                          class="s1-U__bg-color--accent s1-U__border-radius--5px s1-U__align-children--center s1-U__pd8"
                          v-if="Package.DetailedService.TimeStemp"
                        >
                          <md-icon>
                            <span class="s1-U__text-color--white">schedule</span>
                          </md-icon>
                          <p
                            class="s1-U__pd--rt8 s1-U__pd--lt8 s1-U__text-color--white"
                          >Carimbo do tempo ativado</p>
                        </div>
                        <div
                          class="s1-U__bg-color--body-bg s1-U__border-radius--5px s1-U__align-children--center s1-U__pd8"
                          v-if="!Package.DetailedService.TimeStemp"
                        >
                          <md-icon>
                            <span class="s1-U__text-color--dark-2">schedule</span>
                          </md-icon>
                          <p
                            class="s1-U__pd--rt8 s1-U__pd--lt8 s1-U__text-color--dark-2"
                          >Sem carimbo do tempo</p>
                        </div>
                      </div>
                      <div class="s1-U__pd--lt16 s1-U__mg--bt16">
                        <p class="md-caption">Tipo</p>
                        <p
                          class="s1-U__text-ellipsis"
                        >{{getNameById(ServiceTypes ,Package.DetailedService.ServiceType)}}</p>
                      </div>
                      <div class="s1-U__pd--lt16 s1-U__mg--bt16">
                        <p class="md-caption">Fornecedor</p>
                        <p
                          class="s1-U__text-ellipsis"
                        >{{getNameById(Supplier.Data ,Package.DetailedService.Supplier)}}</p>
                      </div>
                      <h3
                        class="md-title s1-U__mg--bt16 s1-U__mg--tp32 s1-U__text-color--primary"
                      >Distribuição</h3>
                      <div class="s1-U__pd--lt16 s1-U__mg--bt16 s1-U__align-children--top">
                        <md-icon class="s1-U__mg--rt8" style="transform: translateY(-1px)">
                          <span class="s1-U__text-color--dark-3">error</span>
                        </md-icon>
                        <p>{{Package.DetailedService.Distribution}}</p>
                      </div>
                      <h3
                        class="md-title s1-U__mg--bt16 s1-U__mg--tp32 s1-U__text-color--primary"
                      >Descrição</h3>
                      <div class="s1-U__pd--lt16 s1-U__mg--bt16">
                        <p class>{{Package.DetailedService.Description}}</p>
                      </div>
                      <h3
                        class="md-title s1-U__mg--bt16 s1-U__mg--tp32 s1-U__text-color--primary"
                      >Contratação</h3>
                      <div class="s1-U__pd--lt16 s1-U__mg--bt16">
                        <p class="md-caption">Frequência de ativação</p>
                        <p
                          class="s1-U__text-ellipsis"
                        >{{ getNameById(Frequences, Package.DetailedService.ActivationFrequency)}}</p>
                      </div>
                      <div class="s1-U__pd--lt16 s1-U__mg--bt16">
                        <p class="md-caption">Vigência</p>
                        <p class="s1-U__text-ellipsis">{{Package.DetailedService.Vigence}} dias</p>
                      </div>
                      <!-- <div class="s1-U__pd--lt16 s1-U__mg--bt16">
                        <p class="md-caption">Custo</p>
                        <p
                          class="s1-U__text-ellipsis"
                        >{{formatMoney(Package.DetailedService.ServiceCost)}}</p>
                      </div> -->
                      <div class="s1-U__pd--lt16 s1-U__mg--bt16">
                        <p class="md-caption">Valor</p>
                        <p
                          class="s1-U__text-ellipsis"
                        >{{formatMoney(Package.DetailedService.ServiceS1Value)}}</p>
                      </div>
                      <h3
                        class="md-title s1-U__mg--bt16 s1-U__mg--tp32 s1-U__text-color--primary"
                      >Informações requeridas</h3>
                      <div class="s1-U__pd--lt16 s1-U__mg--bt16">
                        <p class="md-caption">Titular</p>
                        <div class="s1-chip-wrapper--left">
                          <md-chip
                            v-for="field in getListByProp(Package.DetailedService.Fields, 'Titular', 'AppliedTo')"
                            :key="field.Id + '-fieldzera-' + field.AppliedTo"
                          >{{field.Label}}</md-chip>
                        </div>
                      </div>
                      <div
                        class="s1-U__pd--lt16 s1-U__mg--bt16"
                        v-if="Package.DetailedService.Rules[1].Value > 0"
                      >
                        <p class="md-caption">Beneficiário</p>
                        <div class="s1-chip-wrapper--left">
                          <md-chip
                            v-for="field in getListByProp(Package.DetailedService.Fields, 'Beneficiário', 'AppliedTo')"
                            :key="field.Id + '-fieldzera-' + field.AppliedTo"
                          >{{field.Label}}</md-chip>
                        </div>
                      </div>
                      <div
                        class="s1-U__pd--lt16 s1-U__mg--bt16"
                        v-if="Package.DetailedService.Rules[2].Value > 0"
                      >
                        <p class="md-caption">Dependente</p>
                        <div class="s1-chip-wrapper--left">
                          <md-chip
                            v-for="field in getListByProp(Package.DetailedService.Fields, 'Dependente', 'AppliedTo')"
                            :key="field.Id + '-fieldzera-' + field.AppliedTo"
                          >{{field.Label}}</md-chip>
                        </div>
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
                <h2 class="md-title s1-U__text-ellipsis">{{Package.DetailedService.FriendlyName}}</h2>
                <p
                  class="md-subheading s1-U__text-color--dark-2 s1-U__text-ellipsis"
                >{{Package.DetailedService.Name}}</p>
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
                <div
                  class="s1-U__pd--lt16 s1-U__mg--bt24 s1-U__align-children--center s1-U__full-width"
                >
                  <div
                    class="s1-U__bg-color--accent s1-U__border-radius--5px s1-U__align-children--center s1-U__pd8"
                    v-if="Package.DetailedService.TimeStemp"
                  >
                    <md-icon>
                      <span class="s1-U__text-color--white">schedule</span>
                    </md-icon>
                    <p
                      class="s1-U__pd--rt8 s1-U__pd--lt8 s1-U__text-color--white"
                    >Carimbo do tempo ativado</p>
                  </div>
                  <div
                    class="s1-U__bg-color--body-bg s1-U__border-radius--5px s1-U__align-children--center s1-U__pd8"
                    v-if="!Package.DetailedService.TimeStemp"
                  >
                    <md-icon>
                      <span class="s1-U__text-color--dark-2">schedule</span>
                    </md-icon>
                    <p
                      class="s1-U__pd--rt8 s1-U__pd--lt8 s1-U__text-color--dark-2"
                    >Sem carimbo do tempo</p>
                  </div>
                </div>
                <div class="s1-U__pd--lt16 s1-U__mg--bt16">
                  <p class="md-caption">Tipo</p>
                  <p
                    class="s1-U__text-ellipsis"
                  >{{getNameById(ServiceTypes ,Package.DetailedService.ServiceType)}}</p>
                </div>
                <div class="s1-U__pd--lt16 s1-U__mg--bt16">
                  <p class="md-caption">Fornecedor</p>
                  <p
                    class="s1-U__text-ellipsis"
                  >{{getNameById(Supplier.Data ,Package.DetailedService.Supplier)}}</p>
                </div>
                <h3
                  class="md-title s1-U__mg--bt16 s1-U__mg--tp32 s1-U__text-color--primary"
                >Distribuição</h3>
                <div class="s1-U__pd--lt16 s1-U__mg--bt16 s1-U__align-children--top">
                  <md-icon class="s1-U__mg--rt8" style="transform: translateY(-1px)">
                    <span class="s1-U__text-color--dark-3">error</span>
                  </md-icon>
                  <p>{{Package.DetailedService.Distribution}}</p>
                </div>
                <h3
                  class="md-title s1-U__mg--bt16 s1-U__mg--tp32 s1-U__text-color--primary"
                >Descrição</h3>
                <div class="s1-U__pd--lt16 s1-U__mg--bt16">
                  <p class>{{Package.DetailedService.Description}}</p>
                </div>
                <h3
                  class="md-title s1-U__mg--bt16 s1-U__mg--tp32 s1-U__text-color--primary"
                >Contratação</h3>
                <div class="s1-U__pd--lt16 s1-U__mg--bt16">
                  <p class="md-caption">Frequência de ativação</p>
                  <p
                    class="s1-U__text-ellipsis"
                  >{{ getNameById(Frequences, Package.DetailedService.ActivationFrequency)}}</p>
                </div>
                <div class="s1-U__pd--lt16 s1-U__mg--bt16">
                  <p class="md-caption">Vigência</p>
                  <p class="s1-U__text-ellipsis">{{Package.DetailedService.Vigence}} dias</p>
                </div>
                <!-- <div class="s1-U__pd--lt16 s1-U__mg--bt16">
                  <p class="md-caption">Custo</p>
                  <p
                    class="s1-U__text-ellipsis"
                  >{{formatMoney(Package.DetailedService.ServiceCost)}}</p>
                </div> -->
                <div class="s1-U__pd--lt16 s1-U__mg--bt16">
                  <p class="md-caption">Valor</p>
                  <p
                    class="s1-U__text-ellipsis"
                  >{{formatMoney(Package.DetailedService.ServiceS1Value)}}</p>
                </div>
                <h3
                  class="md-title s1-U__mg--bt16 s1-U__mg--tp32 s1-U__text-color--primary"
                >Informações requeridas</h3>
                <div class="s1-U__pd--lt16 s1-U__mg--bt16">
                  <p class="md-caption">Titular</p>
                  <div class="s1-chip-wrapper--left">
                    <md-chip
                      v-for="field in getListByProp(Package.DetailedService.Fields, 'Titular', 'AppliedTo')"
                      :key="field.Id + '-fieldzera-' + field.AppliedTo"
                    >{{field.Label}}</md-chip>
                  </div>
                </div>
                <div
                  class="s1-U__pd--lt16 s1-U__mg--bt16"
                  v-if="Package.DetailedService.Rules[1].Value > 0"
                >
                  <p class="md-caption">Beneficiário</p>
                  <div class="s1-chip-wrapper--left">
                    <md-chip
                      v-for="field in getListByProp(Package.DetailedService.Fields, 'Beneficiário', 'AppliedTo')"
                      :key="field.Id + '-fieldzera-' + field.AppliedTo"
                    >{{field.Label}}</md-chip>
                  </div>
                </div>
                <div
                  class="s1-U__pd--lt16 s1-U__mg--bt16"
                  v-if="Package.DetailedService.Rules[2].Value > 0"
                >
                  <p class="md-caption">Dependente</p>
                  <div class="s1-chip-wrapper--left">
                    <md-chip
                      v-for="field in getListByProp(Package.DetailedService.Fields, 'Dependente', 'AppliedTo')"
                      :key="field.Id + '-fieldzera-' + field.AppliedTo"
                    >{{field.Label}}</md-chip>
                  </div>
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
    <div v-if="Settings.activePage === 'allSuppliers'">
      <section class="s1-U__width--900px s1-U__pd16" style="margin: 0 auto;">
        <div
          v-show="Supplier.Data.length > 0 && !Supplier.CreationInterface && !Supplier.EditionInterface"
        >
          <div class="s1-U__full-width s1-U__mg--bt32">
            <h1 class="md-display-1 s1-U__text-color--dark-2 s1-U__align-children--center">
              <span>Fornecedores</span>
            </h1>
          </div>
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
              @click="create('Supplier', 'Supplier-Name')"
            >
              <div class="s1-U__align-children--center">
                <md-icon>add</md-icon>
                <span>Fornecedor</span>
              </div>
            </md-button>
          </div>
          <md-table class="s1-U__pd--bt16" v-if="Supplier.Data.length > 0" md-card>
            <md-table-row>
              <md-table-head>Nome</md-table-head>
              <md-table-head>Documento</md-table-head>
              <md-table-head>E-mail</md-table-head>
              <md-table-head>Telefone</md-table-head>
              <md-table-head md-numeric></md-table-head>
            </md-table-row>

            <md-table-row v-for="supplier in Supplier.Data" :key="supplier.Id">
              <md-table-cell>
                <p class="md-caption">{{supplier.Name}}</p>
                <h3>{{supplier.FantasyName}}</h3>
              </md-table-cell>
              <md-table-cell>
                <p class="md-caption">{{supplier.DocumentType}}</p>
                <p>{{supplier.Document}}</p>
              </md-table-cell>
              <md-table-cell>
                <p class="text-s1-U__text-nowrap">{{supplier.Email}}</p>
                <p class="text-s1-U__text-nowrap">{{supplier.Email2}}</p>
              </md-table-cell>
              <md-table-cell>
                <p class="text-s1-U__text-nowrap">{{supplier.Phone}}</p>
                <p class="text-s1-U__text-nowrap">{{supplier.Phone2}}</p>
              </md-table-cell>
              <md-table-cell md-numeric class="s1-U__text-align--right">
                <md-button
                  class="s1-md-bordered"
                  @click="edit('Supplier', supplier.Id, 'Supplier-Name-edit')"
                >Editar</md-button>
              </md-table-cell>
            </md-table-row>
          </md-table>
          <div class="s1-U__text-align--center" v-else>
            <p class="md-body-2 s1-U__text-color--dark-2 s1-U__mg--bt4">Nenhum fornecedor criado</p>
            <md-button class="md-primary md-raised" @click="create('Supplier', 'Supplier-Name')">
              <div class="s1-U__align-children--center s1-U__pd--rt8 s1-U__pd--lt4">
                <md-icon class="s1-U__mg--rt4">add</md-icon>
                <span>Fornecedor</span>
              </div>
            </md-button>
          </div>
        </div>

        <!-- CREATE SUPPLIER -->
        <div v-show="Supplier.CreationInterface">
          <div
            class="md-layout md-alignment-center-center s1-loc__loading"
            style="position: fixed;top: 0;left: 0;"
            :class="Supplier.Loading && 'active'"
          >
            <md-progress-spinner md-mode="indeterminate"></md-progress-spinner>
          </div>
          <div class="s1-U__mg--bt32">
            <div class="md-display-1 s1-U__text-color--dark-2 s1-U__align-children--center">
              <md-button
                class="md-dense md-icon-button s1-U__mg--rt16"
                @click="Supplier.DiscardCreationInterface = true"
              >
                <md-icon>arrow_back</md-icon>
              </md-button>
              <div>
                <h1 class="md-display-1 s1-U__text-color--dark-2 s1-U__align-children--center">
                  <span>Cadastro de fornecedor</span>
                </h1>
              </div>
            </div>
          </div>
          <md-card>
            <md-content class="md-scrollbar s1-U__pd16" style="overflow: auto">
              <h3
                class="md-title s1-U__text-color--primary s1-U__fw--300 s1-U__mg--bt16 s1-U__mg--tp4"
              >Geral</h3>
              <div class="s1-U__pd--lt16">
                <div class="s1-loc__md-field-wrapper s1-U__width--210px">
                  <md-field
                    :md-counter="false"
                    :class="{'md-invalid md-field-helper-text': $v.Supplier.Form.Name.$dirty && $v.Supplier.Form.Name.$invalid}"
                  >
                    <label for="Supplier-Name">Nome</label>
                    <md-input
                      id="Supplier-Name"
                      name="Supplier-Name"
                      type="text"
                      @blur="$v.Supplier.Form.Name.$touch()"
                      @focus="$v.Supplier.Form.Name.$reset()"
                      v-model="Supplier.Form.Name"
                      required
                    ></md-input>
                    <span class="md-error" v-if="!$v.Supplier.Form.Name.required">Obrigatório</span>
                  </md-field>
                </div>
                <div class="s1-loc__md-field-wrapper s1-U__width--210px">
                  <md-field
                    :md-counter="false"
                    :class="{'md-invalid md-field-helper-text': $v.Supplier.Form.FantasyName.$dirty && $v.Supplier.Form.FantasyName.$invalid}"
                  >
                    <label for="Supplier-FantasyName">Nome fantasia</label>
                    <md-input
                      id="Supplier-FantasyName"
                      name="Supplier-FantasyName"
                      type="text"
                      @blur="$v.Supplier.Form.FantasyName.$touch()"
                      @focus="$v.Supplier.Form.FantasyName.$reset()"
                      v-model="Supplier.Form.FantasyName"
                      required
                    ></md-input>
                    <span class="md-error" v-if="!$v.Supplier.Form.FantasyName.required">Obrigatório</span>
                  </md-field>
                </div>
                <div class="s1-loc__md-field-wrapper s1-U__width--210px">
                  <md-field
                    :md-counter="false"
                    :class="{'md-invalid md-field-helper-text': $v.Supplier.Form.DocumentType.$dirty && $v.Supplier.Form.DocumentType.$invalid}"
                  >
                    <label for="Supplier-DocumentType">Tipo de documento</label>
                    <md-input
                      id="Supplier-DocumentType"
                      name="Supplier-DocumentType"
                      type="text"
                      @blur="$v.Supplier.Form.DocumentType.$touch()"
                      @focus="$v.Supplier.Form.DocumentType.$reset()"
                      v-model="Supplier.Form.DocumentType"
                      required
                    ></md-input>
                    <span
                      class="md-error"
                      v-if="!$v.Supplier.Form.DocumentType.required"
                    >Obrigatório</span>
                  </md-field>
                </div>
                <div class="s1-loc__md-field-wrapper s1-U__width--210px">
                  <md-field
                    :md-counter="false"
                    :class="{'md-invalid md-field-helper-text': $v.Supplier.Form.Document.$dirty && $v.Supplier.Form.Document.$invalid}"
                  >
                    <label for="Supplier-Document">Documento</label>
                    <md-input
                      id="Supplier-Document"
                      name="Supplier-Document"
                      type="text"
                      @blur="$v.Supplier.Form.Document.$touch()"
                      @focus="$v.Supplier.Form.Document.$reset()"
                      v-model="Supplier.Form.Document"
                      required
                    ></md-input>
                    <span class="md-error" v-if="!$v.Supplier.Form.Document.required">Obrigatório</span>
                  </md-field>
                </div>
              </div>
              <h3
                class="md-title s1-U__text-color--primary s1-U__fw--300 s1-U__mg--bt16 s1-U__mg--tp32"
              >Contato</h3>
              <div class="s1-U__pd--lt16">
                <div class="s1-U__align-children--top s1-U__flex-wrap">
                  <div class="s1-loc__md-field-wrapper s1-U__width--210px s1-U__pd--rt16">
                    <md-field
                      :md-counter="false"
                      :class="{'md-invalid md-field-helper-text': $v.Supplier.Form.Email.$dirty && $v.Supplier.Form.Email.$invalid}"
                    >
                      <label for="Supplier-Email">E-mail 1</label>
                      <md-input
                        id="Supplier-Email"
                        name="Supplier-Email"
                        type="text"
                        @blur="$v.Supplier.Form.Email.$touch()"
                        @focus="$v.Supplier.Form.Email.$reset()"
                        v-model="Supplier.Form.Email"
                        required
                      ></md-input>
                      <span class="md-error" v-if="!$v.Supplier.Form.Email.required">Obrigatório</span>
                    </md-field>
                  </div>
                  <div
                    class="s1-loc__md-field-wrapper s1-U__width--210px"
                    v-show="Supplier.Form.Email"
                  >
                    <md-field>
                      <label for="Supplier-Email2">E-mail 2</label>
                      <md-input
                        id="Supplier-Email2"
                        name="Supplier-Email2"
                        type="text"
                        v-model="Supplier.Form.Email2"
                      ></md-input>
                    </md-field>
                  </div>
                </div>
                <div class="s1-U__align-children--top s1-U__flex-wrap">
                  <div class="s1-loc__md-field-wrapper s1-U__width--210px s1-U__pd--rt16">
                    <md-field
                      :md-counter="false"
                      :class="{'md-invalid md-field-helper-text': $v.Supplier.Form.Phone.$dirty && $v.Supplier.Form.Phone.$invalid}"
                    >
                      <label for="Supplier-Phone">Telefone 1</label>
                      <md-input
                        id="Supplier-Phone"
                        name="Supplier-Phone"
                        type="text"
                        @blur="$v.Supplier.Form.Phone.$touch()"
                        @focus="$v.Supplier.Form.Phone.$reset()"
                        v-model="Supplier.Form.Phone"
                        required
                      ></md-input>
                      <span class="md-error" v-if="!$v.Supplier.Form.Phone.required">Obrigatório</span>
                    </md-field>
                  </div>
                  <div
                    class="s1-loc__md-field-wrapper s1-U__width--210px"
                    v-show="Supplier.Form.Phone"
                  >
                    <md-field>
                      <label for="Supplier-Phone2">Telefone 2</label>
                      <md-input
                        id="Supplier-Phone2"
                        name="Supplier-Phone2"
                        type="text"
                        v-model="Supplier.Form.Phone2"
                      ></md-input>
                    </md-field>
                  </div>
                </div>
              </div>
            </md-content>
            <div class="s1-U__text-align--right s1-U__pd16 s1-U__border--top1 s1-U__flex-shrink-0">
              <md-button
                class="md-primary md-raised"
                :disabled="$v.Supplier.Form.$invalid"
                @click="saveCreated('Supplier')"
              >
                <span class="s1-U__pd--lt8 s1-U__pd--rt8">Cadastrar fornecedor</span>
              </md-button>
            </div>
          </md-card>
        </div>

        <!-- EDIT SUPPLIER -->
        <div v-show="Supplier.EditionInterface">
          <div
            class="md-layout md-alignment-center-center s1-loc__loading"
            style="position: fixed;top: 0;left: 0;"
            :class="Supplier.Loading && 'active'"
          >
            <md-progress-spinner md-mode="indeterminate"></md-progress-spinner>
          </div>
          <div class="s1-U__mg--bt32">
            <div class="md-display-1 s1-U__text-color--dark-2 s1-U__align-children--center">
              <md-button
                class="md-dense md-icon-button s1-U__mg--rt16 s1-U__mg--tp16"
                @click="Supplier.DiscardEditionInterface = true"
              >
                <md-icon>arrow_back</md-icon>
              </md-button>
              <div v-if="Supplier.Form.Id && Supplier.EditionInterface === true">
                <p class="md-caption s1-U__text-uppercase">
                  <span>{{getNameById(Supplier.Data, Supplier.Form.Id)}}</span>
                </p>
                <h1 class="md-display-1 s1-U__text-color--dark-2 s1-U__align-children--center">
                  <span>Edição de fornecedor</span>
                </h1>
              </div>
            </div>
          </div>
          <md-card>
            <md-content class="md-scrollbar s1-U__pd16" style="overflow: auto">
              <h3
                class="md-title s1-U__text-color--primary s1-U__fw--300 s1-U__mg--bt16 s1-U__mg--tp4"
              >Geral</h3>
              <div class="s1-U__pd--lt16">
                <div class="s1-loc__md-field-wrapper s1-U__width--210px">
                  <md-field
                    :md-counter="false"
                    :class="{'md-invalid md-field-helper-text': $v.Supplier.Form.Name.$dirty && $v.Supplier.Form.Name.$invalid}"
                  >
                    <label for="Supplier-Name-edit">Nome</label>
                    <md-input
                      id="Supplier-Name-edit"
                      name="Supplier-Name-edit"
                      type="text"
                      @blur="$v.Supplier.Form.Name.$touch()"
                      @focus="$v.Supplier.Form.Name.$reset()"
                      v-model="Supplier.Form.Name"
                      required
                    ></md-input>
                    <span class="md-error" v-if="!$v.Supplier.Form.Name.required">Obrigatório</span>
                  </md-field>
                </div>
                <div class="s1-loc__md-field-wrapper s1-U__width--210px">
                  <md-field
                    :md-counter="false"
                    :class="{'md-invalid md-field-helper-text': $v.Supplier.Form.FantasyName.$dirty && $v.Supplier.Form.FantasyName.$invalid}"
                  >
                    <label for="Supplier-FantasyName-edit">Nome fantasia</label>
                    <md-input
                      id="Supplier-FantasyName-edit"
                      name="Supplier-FantasyName-edit"
                      type="text"
                      @blur="$v.Supplier.Form.FantasyName.$touch()"
                      @focus="$v.Supplier.Form.FantasyName.$reset()"
                      v-model="Supplier.Form.FantasyName"
                      required
                    ></md-input>
                    <span class="md-error" v-if="!$v.Supplier.Form.FantasyName.required">Obrigatório</span>
                  </md-field>
                </div>
                <div class="s1-loc__md-field-wrapper s1-U__width--210px">
                  <md-field
                    :md-counter="false"
                    :class="{'md-invalid md-field-helper-text': $v.Supplier.Form.DocumentType.$dirty && $v.Supplier.Form.DocumentType.$invalid}"
                  >
                    <label for="Supplier-DocumentType-edit">Tipo de documento</label>
                    <md-input
                      id="Supplier-DocumentType-edit"
                      name="Supplier-DocumentType-edit"
                      type="text"
                      @blur="$v.Supplier.Form.DocumentType.$touch()"
                      @focus="$v.Supplier.Form.DocumentType.$reset()"
                      v-model="Supplier.Form.DocumentType"
                      required
                    ></md-input>
                    <span
                      class="md-error"
                      v-if="!$v.Supplier.Form.DocumentType.required"
                    >Obrigatório</span>
                  </md-field>
                </div>
                <div class="s1-loc__md-field-wrapper s1-U__width--210px">
                  <md-field
                    :md-counter="false"
                    :class="{'md-invalid md-field-helper-text': $v.Supplier.Form.Document.$dirty && $v.Supplier.Form.Document.$invalid}"
                  >
                    <label for="Supplier-Document-edit">Documento</label>
                    <md-input
                      id="Supplier-Document-edit"
                      name="Supplier-Document-edit"
                      type="text"
                      @blur="$v.Supplier.Form.Document.$touch()"
                      @focus="$v.Supplier.Form.Document.$reset()"
                      v-model="Supplier.Form.Document"
                      required
                    ></md-input>
                    <span class="md-error" v-if="!$v.Supplier.Form.Document.required">Obrigatório</span>
                  </md-field>
                </div>
              </div>
              <h3
                class="md-title s1-U__text-color--primary s1-U__fw--300 s1-U__mg--bt16 s1-U__mg--tp32"
              >Contato</h3>
              <div class="s1-U__pd--lt16">
                <div class="s1-U__align-children--top s1-U__flex-wrap">
                  <div class="s1-loc__md-field-wrapper s1-U__width--210px s1-U__pd--rt16">
                    <md-field
                      :md-counter="false"
                      :class="{'md-invalid md-field-helper-text': $v.Supplier.Form.Email.$dirty && $v.Supplier.Form.Email.$invalid}"
                    >
                      <label for="Supplier-Email-edit">E-mail 1</label>
                      <md-input
                        id="Supplier-Email-edit"
                        name="Supplier-Email-edit"
                        type="text"
                        @blur="$v.Supplier.Form.Email.$touch()"
                        @focus="$v.Supplier.Form.Email.$reset()"
                        v-model="Supplier.Form.Email"
                        required
                      ></md-input>
                      <span class="md-error" v-if="!$v.Supplier.Form.Email.required">Obrigatório</span>
                    </md-field>
                  </div>
                  <div
                    class="s1-loc__md-field-wrapper s1-U__width--210px"
                    v-show="Supplier.Form.Email"
                  >
                    <md-field>
                      <label for="Supplier-Email2-edit">E-mail 2</label>
                      <md-input
                        id="Supplier-Email2-edit"
                        name="Supplier-Email2-edit"
                        type="text"
                        v-model="Supplier.Form.Email2"
                      ></md-input>
                    </md-field>
                  </div>
                </div>
                <div class="s1-U__align-children--top s1-U__flex-wrap">
                  <div class="s1-loc__md-field-wrapper s1-U__width--210px s1-U__pd--rt16">
                    <md-field
                      :md-counter="false"
                      :class="{'md-invalid md-field-helper-text': $v.Supplier.Form.Phone.$dirty && $v.Supplier.Form.Phone.$invalid}"
                    >
                      <label for="Supplier-Phone-edit">Telefone 1</label>
                      <md-input
                        id="Supplier-Phone-edit"
                        name="Supplier-Phone-edit"
                        type="text"
                        @blur="$v.Supplier.Form.Phone.$touch()"
                        @focus="$v.Supplier.Form.Phone.$reset()"
                        v-model="Supplier.Form.Phone"
                        required
                      ></md-input>
                      <span class="md-error" v-if="!$v.Supplier.Form.Phone.required">Obrigatório</span>
                    </md-field>
                  </div>
                  <div
                    class="s1-loc__md-field-wrapper s1-U__width--210px"
                    v-show="Supplier.Form.Phone"
                  >
                    <md-field>
                      <label for="Supplier-Phone2-edit">Telefone 2</label>
                      <md-input
                        id="Supplier-Phone2-edit"
                        name="Supplier-Phone2-edit"
                        type="text"
                        v-model="Supplier.Form.Phone2"
                      ></md-input>
                    </md-field>
                  </div>
                </div>
              </div>
            </md-content>
            <div class="s1-U__text-align--right s1-U__pd16 s1-U__border--top1 s1-U__flex-shrink-0">
              <md-button
                class="md-primary md-raised"
                :disabled="$v.Supplier.Form.$invalid"
                @click="saveEdited('Supplier')"
              >
                <span class="s1-U__pd--lt8 s1-U__pd--rt8">Salvar</span>
              </md-button>
            </div>
          </md-card>
        </div>

        <md-dialog-confirm
          :md-active.sync="Supplier.DiscardCreationInterface"
          md-title="Descartar cadastro?"
          md-content="Ao sair, as informações do fornecedor em cadastro serão descartadas"
          md-confirm-text="descartar"
          md-cancel-text="voltar"
          @md-cancel="Supplier.DiscardCreationInterface = false"
          @md-confirm="discardCreation('Supplier')"
        />
        <md-snackbar
          :md-duration="Settings.snackbarDuration"
          :md-active.sync="Supplier.SuccessFeedbackCreation"
          md-persistent
        >
          <span>Fornecedor criado com sucesso</span>
          <md-button class="md-accent" @click="Supplier.SuccessFeedbackCreation = false">OK</md-button>
        </md-snackbar>
        <md-dialog-confirm
          :md-active.sync="Supplier.DiscardEditionInterface"
          md-title="Descartar cadastro?"
          md-content="Ao sair, as informações do fornecedor em edição serão descartadas"
          md-confirm-text="descartar"
          md-cancel-text="voltar"
          @md-cancel="Supplier.DiscardEditionInterface = false"
          @md-confirm="discardEdition('Supplier')"
        />
        <md-snackbar
          :md-duration="Settings.snackbarDuration"
          :md-active.sync="Supplier.SuccessFeedbackEdition"
          md-persistent
        >
          <span>Fornecedor editado com sucesso</span>
          <md-button class="md-accent" @click="Supplier.SuccessFeedbackEdition = false">OK</md-button>
        </md-snackbar>
      </section>
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
import Fields from "./data/Fields.js";
import Frequences from "./data/Frequences.js";

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
    Fields,
    Frequences,
    Supplier: {
      Form: {
        Name: null,
        FantasyName: null,
        Document: null,
        DocumentType: null,
        Phone: null,
        Phone2: null,
        Email: null,
        Email2: null
      },
      DefaultForm: {
        Name: null,
        FantasyName: null,
        Document: null,
        DocumentType: null,
        Phone: null,
        Phone2: null,
        Email: null,
        Email2: null
      },
      Detailed: {
        Name: null,
        FantasyName: null,
        Document: null,
        DocumentType: null,
        Phone: null,
        Phone2: null,
        Email: null,
        Email2: null
      },
      Data: Suppliers,
      MockData: Suppliers,
      Loading: false,
      EditingIndex: 0,
      EditionInterface: false,
      DiscardEditionInterface: false,
      SuccessFeedbackEdition: false,
      CreationInterface: false,
      DiscardCreationInterface: false,
      SuccessFeedbackCreation: false,
      DeleteConfirmation: false,
      SuccessFeedbackDeletion: false
    },
    Package: {
      moreQty: 3,
      Form: {
        Id: null,
        Name: null,
        Services: [],
        TenantId: null,
        ServicesServiceS1Value: null,
        TotalServiceS1Value: null,
        Price: 0.0,
        Active: true,
        Purpose: "Sale"
      },
      DefaultForm: {
        Id: null,
        Name: null,
        Services: [],
        TenantId: null,
        ServicesServiceS1Value: null,
        TotalServiceS1Value: null,
        Price: 0.0,
        Active: true,
        Purpose: "Sale"
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
        Supplier: "0",
        ServiceType: "0",
        Description: null,
        ServiceS1Value: null,
        ServiceCost: null,
        Vigence: null,
        CurrencyCode: "BRL",
        TimeStemp: false,
        ActivationFrequency: "daily",
        Distribution:
          "Sozinho em um pacote ou junto de outros serviços em um pacote",
        Rules: [
          {
            AppliedTo: "Titular",
            Operator: "=",
            Value: "1"
          },
          {
            AppliedTo: "Beneficiário",
            Operator: "=",
            Value: "0"
          },
          {
            AppliedTo: "Dependente",
            Operator: "=",
            Value: "0"
          }
        ],
        Fields: [
          {
            Id: "asda777989dihahd1892uiojke2bn1w089yasokdaksdda09u2oi1kll",
            Type: "Text",
            Label: "Nome",
            DataType: "string",
            AppliedTo: "Titular",
            Criterias: []
          },
          {
            Id: "asda777989dihahd1892uiojke2bn1w089yasokdaksdda09u2oi1kl2",
            Type: "CPF",
            Label: "CPF",
            DataType: "string",
            AppliedTo: "Titular",
            Criterias: []
          },
          {
            Id: "asda777989dihahd1892uiojke2bn1w089yasokdaksdda09u2oi1kll",
            Type: "Text",
            Label: "Nome",
            DataType: "string",
            AppliedTo: "Beneficiário",
            Criterias: []
          },
          {
            Id: "asda777989dihahd1892uiojke2bn1w089yasokdaksdda09u2oi1kl2",
            Type: "CPF",
            Label: "CPF",
            DataType: "string",
            AppliedTo: "Beneficiário",
            Criterias: []
          },
          {
            Id: "asda777989dihahd1892uiojke2bn1w089yasokdaksdda09u2oi1kll",
            Type: "Text",
            Label: "Nome",
            DataType: "string",
            AppliedTo: "Dependente",
            Criterias: []
          },
          {
            Id: "asda777989dihahd1892uiojke2bn1w089yasokdaksdda09u2oi1kl2",
            Type: "CPF",
            Label: "CPF",
            DataType: "string",
            AppliedTo: "Dependente",
            Criterias: []
          }
        ]
      },
      ConfirmSwitchActive: false,
      IdToSwitchActive: null
    },
    Service: {
      moreQty: 3,
      ActiveCategory: "0",
      ShowFilter: false,
      Filters: {
        Forn: ['Jujuca LTDA', 'Sem Mais do Dom Dom TMMMMM']
      },
      Form: {
        Id: null,
        Name: null,
        FriendlyName: null,
        Supplier: "0",
        ServiceType: "0",
        Description: null,
        ServiceS1Value: 0.0,
        ServiceCost: 0.0,
        Vigence: 30,
        CurrencyCode: "BRL",
        TimeStemp: false,
        ActivationFrequency: "daily",
        Distribution:
          "Sozinho em um pacote ou junto de outros serviços em um pacote",
        Rules: [
          {
            AppliedTo: "Titular",
            Operator: "=",
            Value: "1"
          },
          {
            AppliedTo: "Beneficiário",
            Operator: "=",
            Value: "0"
          },
          {
            AppliedTo: "Dependente",
            Operator: "=",
            Value: "0"
          }
        ],
        Fields: [
          {
            Id: "asda777989dihahd1892uiojke2bn1w089yasokdaksdda09u2oi1kll",
            Type: "Text",
            Label: "Nome",
            DataType: "string",
            AppliedTo: "Titular",
            Criterias: []
          },
          {
            Id: "asda777989dihahd1892uiojke2bn1w089yasokdaksdda09u2oi1kl2",
            Type: "CPF",
            Label: "CPF",
            DataType: "string",
            AppliedTo: "Titular",
            Criterias: []
          },
          {
            Id: "asda777989dihahd1892uiojke2bn1w089yasokdaksdda09u2oi1kll",
            Type: "Text",
            Label: "Nome",
            DataType: "string",
            AppliedTo: "Beneficiário",
            Criterias: []
          },
          {
            Id: "asda777989dihahd1892uiojke2bn1w089yasokdaksdda09u2oi1kl2",
            Type: "CPF",
            Label: "CPF",
            DataType: "string",
            AppliedTo: "Beneficiário",
            Criterias: []
          },
          {
            Id: "asda777989dihahd1892uiojke2bn1w089yasokdaksdda09u2oi1kll",
            Type: "Text",
            Label: "Nome",
            DataType: "string",
            AppliedTo: "Dependente",
            Criterias: []
          },
          {
            Id: "asda777989dihahd1892uiojke2bn1w089yasokdaksdda09u2oi1kl2",
            Type: "CPF",
            Label: "CPF",
            DataType: "string",
            AppliedTo: "Dependente",
            Criterias: []
          }
        ]
      },
      DefaultForm: {
        Id: null,
        Name: null,
        FriendlyName: null,
        Supplier: "0",
        ServiceType: "0",
        Description: null,
        ServiceS1Value: 0.0,
        ServiceCost: 0.0,
        Vigence: 30,
        CurrencyCode: "BRL",
        TimeStemp: false,
        ActivationFrequency: "daily",
        Distribution:
          "Sozinho em um pacote ou junto de outros serviços em um pacote",
        Rules: [
          {
            AppliedTo: "Titular",
            Operator: "=",
            Value: "1"
          },
          {
            AppliedTo: "Beneficiário",
            Operator: "=",
            Value: "0"
          },
          {
            AppliedTo: "Dependente",
            Operator: "=",
            Value: "0"
          }
        ],
        Fields: [
          {
            Id: "asda777989dihahd1892uiojke2bn1w089yasokdaksdda09u2oi1kll",
            Type: "Text",
            Label: "Nome",
            DataType: "string",
            AppliedTo: "Titular",
            Criterias: []
          },
          {
            Id: "asda777989dihahd1892uiojke2bn1w089yasokdaksdda09u2oi1kl2",
            Type: "CPF",
            Label: "CPF",
            DataType: "string",
            AppliedTo: "Titular",
            Criterias: []
          },
          {
            Id: "asda777989dihahd1892uiojke2bn1w089yasokdaksdda09u2oi1kll",
            Type: "Text",
            Label: "Nome",
            DataType: "string",
            AppliedTo: "Beneficiário",
            Criterias: []
          },
          {
            Id: "asda777989dihahd1892uiojke2bn1w089yasokdaksdda09u2oi1kl2",
            Type: "CPF",
            Label: "CPF",
            DataType: "string",
            AppliedTo: "Beneficiário",
            Criterias: []
          },
          {
            Id: "asda777989dihahd1892uiojke2bn1w089yasokdaksdda09u2oi1kll",
            Type: "Text",
            Label: "Nome",
            DataType: "string",
            AppliedTo: "Dependente",
            Criterias: []
          },
          {
            Id: "asda777989dihahd1892uiojke2bn1w089yasokdaksdda09u2oi1kl2",
            Type: "CPF",
            Label: "CPF",
            DataType: "string",
            AppliedTo: "Dependente",
            Criterias: []
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
      ShowServiceDetails: false,
      DetailedService: {
        Id: null,
        Name: null,
        FriendlyName: null,
        Supplier: "0",
        ServiceType: "0",
        Description: null,
        ServiceS1Value: null,
        ServiceCost: null,
        Vigence: null,
        CurrencyCode: "BRL",
        TimeStemp: false,
        ActivationFrequency: "daily",
        Distribution:
          "Sozinho em um pacote ou junto de outros serviços em um pacote",
        Rules: [
          {
            AppliedTo: "Titular",
            Operator: "=",
            Value: "1"
          },
          {
            AppliedTo: "Beneficiário",
            Operator: "=",
            Value: "0"
          },
          {
            AppliedTo: "Dependente",
            Operator: "=",
            Value: "0"
          }
        ],
        Fields: [
          {
            Id: "asda777989dihahd1892uiojke2bn1w089yasokdaksdda09u2oi1kll",
            Type: "Text",
            Label: "Nome",
            DataType: "string",
            AppliedTo: "Titular",
            Criterias: []
          },
          {
            Id: "asda777989dihahd1892uiojke2bn1w089yasokdaksdda09u2oi1kl2",
            Type: "CPF",
            Label: "CPF",
            DataType: "string",
            AppliedTo: "Titular",
            Criterias: []
          },
          {
            Id: "asda777989dihahd1892uiojke2bn1w089yasokdaksdda09u2oi1kll",
            Type: "Text",
            Label: "Nome",
            DataType: "string",
            AppliedTo: "Beneficiário",
            Criterias: []
          },
          {
            Id: "asda777989dihahd1892uiojke2bn1w089yasokdaksdda09u2oi1kl2",
            Type: "CPF",
            Label: "CPF",
            DataType: "string",
            AppliedTo: "Beneficiário",
            Criterias: []
          },
          {
            Id: "asda777989dihahd1892uiojke2bn1w089yasokdaksdda09u2oi1kll",
            Type: "Text",
            Label: "Nome",
            DataType: "string",
            AppliedTo: "Dependente",
            Criterias: []
          },
          {
            Id: "asda777989dihahd1892uiojke2bn1w089yasokdaksdda09u2oi1kl2",
            Type: "CPF",
            Label: "CPF",
            DataType: "string",
            AppliedTo: "Dependente",
            Criterias: []
          }
        ]
      },
      FormFavoredVisibility: {
        Titular: true,
        Beneficiário: false,
        Dependente: false
      },
      FieldOptions: [
        {
          Id: "Text",
          Label: "Texto simples",
          Name: "Texto simples",
          Value: ["Text"]
        },
        {
          Id: "Number",
          Label: "Campo numérico",
          Name: "Campo numérico",
          Value: ["Number"]
        },
        {
          Id: "Addresses",
          Label: "Endereço",
          Name: "Endereço",
          Value: ["Text", "Text"]
        },
        {
          Id: "Date",
          Label: "Data",
          Name: "Data de ",
          Value: ["Date"]
        },
        {
          Id: "Genre",
          Label: "Gênero",
          Name: "Gênero",
          Value: ["Genre"]
        },
        {
          Id: "Email",
          Label: "E-mail",
          Name: "E-mail",
          Value: ["Email"]
        },
        {
          Id: "Email2x",
          Label: "E-mails (x2)",
          Name: "E-mail",
          Value: ["Email", "Email"]
        },
        {
          Id: "Phone",
          Label: "Telefone",
          Name: "Telefone",
          Value: ["Phone"]
        },
        {
          Id: "Phone2x",
          Label: "Telefones (x2)",
          Name: "Telefone",
          Value: ["Phone", "Phone"]
        },
        {
          Id: "Phone3x",
          Label: "Telefones (x3)",
          Name: "Telefone",
          Value: ["Phone", "Phone", "Phone"]
        }
      ]
    },
    Settings: {
      snackbarDuration: 3000,
      activePage: "allServices"
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
    newByClone(entityName, item, idToFocus = null) {
      this[entityName].Form = { ...item };
      this[entityName].Form.Name = null;
      this[entityName].Form.Id = randomString(64, "#aA");

      this[entityName].CreationInterface = true;

      if (idToFocus) {
        setTimeout(() => {
          if (document.getElementById(idToFocus))
            document.getElementById(idToFocus).focus();
        }, 300);
      }
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
      this.setEditingIndex(entityName, id);
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
        self[entityName].Form = { ...self[entityName].DefaultForm };
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
      return this.getListByProp(this.Service.Data, type, "ServiceType");
    },
    getObjIncluded() {
      if (this.Package.Form.Services.length === 0) return [];
      return this.Package.Form.Services.map(serviceId => {
        return getObjByProp(this.Service.Data, serviceId, "Id");
      });
    },
    getIncludedServicesByType(type) {
      return this.getListByProp(this.getObjIncluded(), type, "ServiceType");
    },
    getPriceByType(type) {
      if (this.getIncludedServicesByType(type).length === 0) return 0;
      const reducer = (accumulator, currentValue) => {
        return accumulator + parseFloat(currentValue.ServiceS1Value);
      };
      const array = this.getIncludedServicesByType(type);
      return array.reduce(reducer, 0);
    },
    closeAndClearDetails() {
      this.Package.ShowServiceDetails = false;
      this.Package.DetailedService = {
        Id: null,
        Name: null,
        FriendlyName: null,
        Supplier: "0",
        ServiceType: "0",
        Description: null,
        ServiceS1Value: null,
        ServiceCost: null,
        Vigence: null,
        CurrencyCode: "BRL",
        TimeStemp: false,
        ActivationFrequency: "daily",
        Distribution:
          "Sozinho em um pacote ou junto de outros serviços em um pacote",
        Rules: [],
        Fields: []
      };
    },
    closeAndClearServiceDetails() {
      this.Service.ShowServiceDetails = false;
      this.Service.DetailedService = { ...this.Service.DefaultForm };
    },
    setShowServiceDetail(service) {
      if (service.Id === this.Package.DetailedService.Id) {
        this.closeAndClearDetails();
      } else {
        this.Package.ShowServiceDetails = true;
        this.Package.DetailedService = service;
      }
    },
    setShowServiceDetailInServices(service) {
      if (service.Id === this.Service.DetailedService.Id) {
        this.closeAndClearServiceDetails();
      } else {
        this.Service.ShowServiceDetails = true;
        this.Service.DetailedService = service;
      }
    },
    getServicesServiceS1Value() {
      let cost = 0;
      if (this.Package.Form.Services.length > 0) {
        cost = this.Package.Form.Services.map(s => {
          return getPropById(this.Service.Data, s, "ServiceS1Value");
        }).reduce((accumulator, currentValue) => {
          return accumulator + parseFloat(currentValue);
        });
      }

      this.Package.Form.ServicesServiceS1Value = cost;
      return cost;
    },
    getServicesValue() {
      let value = 0;
      if (this.Package.Form.Services.length > 0) {
        value = this.Package.Form.Services.map(s => {
          return getPropById(this.Service.Data, s, "Value");
        }).reduce((accumulator, currentValue) => {
          return accumulator + currentValue;
        });
      }

      this.Package.Form.TotalServiceS1Value = value;
      return value;
    },
    addNewField(favored, ids, label) {
      const getOccurrence = (array, value) => {
        var count = 0;
        array.forEach(v => v === value && count++);
        return count;
      };
      let count = [];
      let item = ids.map(i => {
        count = [...count, i];
        let labelN = `${label}${
          getOccurrence(ids, i) > 1 ? ` ${getOccurrence(count, i)}` : ""
        }`;

        return {
          Id: randomString(64, "#aA"),
          Type: i,
          Label: labelN,
          DataType: "string",
          AppliedTo: favored,
          Criterias: []
        };
      });
      this.Service.Form.Fields = [...this.Service.Form.Fields, ...item];
    },
    removeField(id) {
      this.Service.Form.Fields = this.Service.Form.Fields.filter(f => {
        return f.Id !== id;
      });
    },
    reshuffle(index) {
      let z = this.Service.Form.Rules[0];
      let a = this.Service.Form.Rules[1];
      let b = this.Service.Form.Rules[2];
      if (index === 2) {
        this.Service.Form.Rules = [z, b, a];
      } else {
        this.Service.Form.Rules = [z, a, b];
      }
    },
    reshuffleN(index) {
      let z = this.Service.Form.Rules[0];
      let a = this.Service.Form.Rules[1];
      let b = this.Service.Form.Rules[2];
      if (index === 1) {
        this.Service.Form.Rules = [z, b, a];
      } else {
        this.Service.Form.Rules = [z, a, b];
      }
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
          required
        },
        FriendlyName: {
          required
        },
        Supplier: {
          required
        },
        ServiceType: {
          required
        },
        ServiceS1Value: {
          required
        },
        Vigence: {
          required
        }
      }
    },
    Supplier: {
      Form: {
        Id: {
          required
        },
        Name: {
          required
        },
        FantasyName: {
          required
        },
        Document: {
          required
        },
        DocumentType: {
          required
        },
        Email: {
          required
        },
        Phone: {
          required
        }
      }
    }
  }
};
</script>
