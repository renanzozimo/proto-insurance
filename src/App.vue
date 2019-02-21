<template>
  <div
    id="app"
    :class="{'s1-loc-comp__mezzanine-is-active' : Package.ShowServiceDetails && !Package.ServicesDialog}"
  >
    <div
      class="s1-U__width--900px s1-U__pd16"
      style="margin: 0 auto;"
      v-show="!Package.CreationInterface && !Package.EditionInterface"
    >
      <div class="md-layout md-alignment-center-space-between s1-U__full-width s1-U__mg--bt32">
        <div class="md-layout-item">
          <h1 class="md-display-1">Pacotes</h1>
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
                  <span class="s1-U__mg--lt8 s1-U__mg--rt8 s1-U__text-color--dark-3">|</span>
                  <span class="md-caption s1-U__text-color--dark-2">
                    {{formatMoney(pack.TotalCost)}}
                    <md-tooltip md-direction="left">Custo mínimo repassado</md-tooltip>
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
                      {{formatMoney(pack.TotalValue)}}
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
        <h1 class="md-display-1 s1-U__text-color--dark-2 s1-U__align-children--center">
          <md-button
            class="md-dense md-icon-button s1-U__mg--rt16"
            @click="Package.DiscardCreationInterface = true"
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
                  <span
                    class="md-error"
                    v-if="!$v.Package.Form.Name.minLength"
                  >Mínimo de 4 caracteres</span>
                </md-field>
              </div>
              <div class="s1-loc__md-field-wrapper s1-U__width--180px">
                <md-field>
                  <label for="Package-Company">Empresa</label>
                  <md-select
                    id="Package-Company"
                    name="Package-Company"
                    v-model="Package.Form.Company"
                  >
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
                    >{{getNameById(Services, service)}}</span>
                    <div class="s1-U__align-children--center">
                      <span
                        class="md-body-2 s1-U__text-color--accent s1-U__mg--rt8 s1-U__flex-shrink-0"
                      >{{formatMoney(getPropById(Services, service, 'Value'))}}</span>
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
            >Custo do pacote</h3>

            <div class="s1-U__pd--lt16">
              <p>
                <span class="md-caption s1-U__text-color--dark-3">
                  <b>{{formatMoney(getServicesCost())}}</b>
                  <md-tooltip md-direction="right">Custo fornecedor</md-tooltip>
                </span>
              </p>
              <p class="md-title s1-U__text-color--accent s1-U__full-width">
                <span>
                  {{formatMoney(getServicesValue())}}
                  <md-tooltip md-direction="right">Custo repassado</md-tooltip>
                </span>
              </p>
              <div class="s1-loc__md-field-wrapper s1-U__width--160px s1-U__mg--tp16">
                <md-field
                  :class="{'md-invalid md-field-helper-text': $v.Package.Form.TotalValue.$dirty && $v.Package.Form.TotalValue.$invalid}"
                >
                  <label for="Package-TotalValue">Valor repasse</label>
                  <md-input
                    id="Package-TotalValue"
                    name="Package-TotalValue"
                    type="text"
                    @blur="$v.Package.Form.TotalValue.$touch()"
                    @focus="$v.Package.Form.TotalValue.$reset()"
                    v-model="Package.Form.TotalValue"
                    required
                  ></md-input>
                  <span
                    class="md-error"
                    v-if="!$v.Package.Form.TotalValue.required"
                  >Campo obrigatório</span>
                </md-field>
              </div>
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
          <div class="s1-U__full-height s1-U__full-width s1-U__flex-column s1-U__bg-color--body-bg">
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
                  <h3 class="md-title">{{service.Name}}</h3>
                </div>
                <div
                  class="s1-U__pd--rt16 s1-U__pd--bt16 s1-U__pd--lt16 s1-U__align-children--center s1-U__justify-content--space-between"
                >
                  <h3 class="s1-U__fw--300 s1-U__text-color--primary s1-U__pd--rt16">
                    <span class="s1-U__text-color--accent">
                      {{formatMoney(service.Value)}}
                      <md-tooltip md-direction="right">Custo S1</md-tooltip>
                    </span>
                    <span class="md-caption s1-U__mg--lt8">
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
                    >{{formatMoney(getTotalValueByType(type.Id))}}</p>
                  </div>
                  <div class="s1-U__pd--lt16 s1-U__mg--tp4">
                    <div
                      class="md-caption s1-U__mg--tp4"
                      v-for="service in getIncludedServicesByType(type.Id)"
                      :key="service.Id"
                    >
                      <span>{{service.Name}}</span>
                      <span class="s1-U__mg--lt16">{{formatMoney(service.Value)}}</span>
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
            <div class="s1-U__pd16 s1-U__flex-shrink-0 s1-U__text-align--right" style="z-index: 0">
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
                    <div class="s1-U__pd--lt16 s1-U__mg--bt16">
                      <p class="md-caption">CUSTO S1</p>
                      <p class="s1-U__text-ellipsis">{{formatMoney(Package.DetailedService.Value)}}</p>
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
                  <span class="md-error" v-if="!$v.Package.Form.Name.required">Campo obrigatório</span>
                  <span
                    class="md-error"
                    v-if="!$v.Package.Form.Name.minLength"
                  >Mínimo de 4 caracteres</span>
                </md-field>
              </div>
              <div class="s1-loc__md-field-wrapper s1-U__width--180px">
                <md-field>
                  <label for="Package-edit-Company">Empresa</label>
                  <md-select
                    id="Package-edit-Company"
                    name="Package-edit-Company"
                    v-model="Package.Form.Company"
                  >
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
                    >{{getNameById(Services, service)}}</span>
                    <div class="s1-U__align-children--center">
                      <span
                        class="md-body-2 s1-U__text-color--accent s1-U__mg--rt8 s1-U__flex-shrink-0"
                      >{{formatMoney(getPropById(Services, service, 'Value'))}}</span>
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
            >Custo do pacote</h3>

            <div class="s1-U__pd--lt16">
              <p>
                <span class="md-caption s1-U__text-color--dark-3">
                  <b>{{formatMoney(getServicesCost())}}</b>
                  <md-tooltip md-direction="right">Custo fornecedor</md-tooltip>
                </span>
              </p>
              <p class="md-title s1-U__text-color--accent s1-U__full-width">
                <span>
                  {{formatMoney(getServicesValue())}}
                  <md-tooltip md-direction="right">Custo repassado</md-tooltip>
                </span>
              </p>
              <div class="s1-loc__md-field-wrapper s1-U__width--160px s1-U__mg--tp16">
                <md-field
                  :class="{'md-invalid md-field-helper-text': $v.Package.Form.TotalValue.$dirty && $v.Package.Form.TotalValue.$invalid}"
                >
                  <label for="Package-edit-TotalValue">Valor repasse</label>
                  <md-input
                    id="Package-edit-TotalValue"
                    name="Package-edit-TotalValue"
                    type="number"
                    @blur="$v.Package.Form.TotalValue.$touch()"
                    @focus="$v.Package.Form.TotalValue.$reset()"
                    v-model="Package.Form.TotalValue"
                    required
                  ></md-input>
                  <span
                    class="md-error"
                    v-if="!$v.Package.Form.TotalValue.required"
                  >Campo obrigatório</span>
                </md-field>
              </div>
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
          <div class="s1-U__full-height s1-U__full-width s1-U__flex-column s1-U__bg-color--body-bg">
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
                  <h3 class="md-title">{{service.Name}}</h3>
                </div>
                <div
                  class="s1-U__pd--rt16 s1-U__pd--bt16 s1-U__pd--lt16 s1-U__align-children--center s1-U__justify-content--space-between"
                >
                  <h3 class="s1-U__fw--300 s1-U__text-color--primary s1-U__pd--rt16">
                    <span class="s1-U__text-color--accent">
                      {{formatMoney(service.Value)}}
                      <md-tooltip md-direction="right">Custo S1</md-tooltip>
                    </span>
                    <span class="md-caption s1-U__mg--lt8">
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
                    >{{formatMoney(getTotalValueByType(type.Id))}}</p>
                  </div>
                  <div class="s1-U__pd--lt16 s1-U__mg--tp4">
                    <div
                      class="md-caption s1-U__mg--tp4"
                      v-for="service in getIncludedServicesByType(type.Id)"
                      :key="service.Id"
                    >
                      <span>{{service.Name}}</span>
                      <span class="s1-U__mg--lt16">{{formatMoney(service.Value)}}</span>
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
            <div class="s1-U__pd16 s1-U__flex-shrink-0 s1-U__text-align--right" style="z-index: 0">
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
                    <div class="s1-U__pd--lt16 s1-U__mg--bt16">
                      <p class="md-caption">CUSTO S1</p>
                      <p class="s1-U__text-ellipsis">{{formatMoney(Package.DetailedService.Value)}}</p>
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
              <div class="s1-U__pd--lt16 s1-U__mg--bt16">
                <p class="md-caption">CUSTO S1</p>
                <p class="s1-U__text-ellipsis">{{formatMoney(Package.DetailedService.Value)}}</p>
              </div>
              <h3 class="md-title s1-U__mg--bt16 s1-U__mg--tp32 s1-U__text-color--primary">Descrição</h3>
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
        ServicesCost: null,
        TotalCost: null,
        TotalValue: null
      },
      DefaultForm: {
        Id: null,
        Name: null,
        Services: [],
        ServicesCost: null,
        TotalCost: null,
        TotalValue: null
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
        Supplier: null,
        Type: null,
        Description: null,
        Cost: null,
        Value: null,
        Vigence: null
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
    getTotalValueByType(type) {
      if (this.getIncludedServicesByType(type).length === 0) return 0;
      const reducer = (accumulator, currentValue) => {
        return accumulator + currentValue.Value;
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
        TotalValue: {
          required
        }
      }
    }
  }
};
</script>
