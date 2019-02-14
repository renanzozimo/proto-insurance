<template>
  <div id="app" class="s1-U__flex-column" style="height: 100vh">
    <div
      class="s1-U__flex-shrink-0 s1-U__pd--tp8 s1-U__pd--bt8 s1-U__border--bottom1 s1-U__bg-color--white s1-U__align-children--center"
    >
      <md-divider class="s1-U__mg--bt32 s1-U__flex-shrink-0" style="width: 10vw"></md-divider>
      <div
        class="s1-U__text-align--center s1-U__pd--bt32 s1-U__flex-shrink-0"
        style="position: relative"
      >
        <md-button class="md-icon-button s1-md-bordered md-primary s1-loc__step-button">
          <md-icon>category</md-icon>
        </md-button>
        <div style="position: absolute; bottom: 2px; transform: translateX(-50%); left: 50%">
          <span class="md-body-2 s1-U__text-color--primary">Composição</span>
        </div>
      </div>
      <md-divider class="s1-U__full-width s1-U__mg--bt32"></md-divider>
      <div
        class="s1-U__text-align--center s1-U__pd--bt32 s1-U__flex-shrink-0"
        style="position: relative"
      >
        <md-button class="md-icon-button s1-md-bordered s1-loc__step-button">
          <md-icon>attach_money</md-icon>
        </md-button>
        <div style="position: absolute; bottom: 2px; transform: translateX(-50%); left: 50%">
          <span class="md-body-2 s1-U__text-color--dark-2">Preço</span>
        </div>
      </div>
      <md-divider class="s1-U__full-width s1-U__mg--bt32"></md-divider>
      <div
        class="s1-U__text-align--center s1-U__pd--bt32 s1-U__flex-shrink-0"
        style="position: relative"
      >
        <md-button class="md-icon-button s1-md-bordered s1-loc__step-button">
          <md-icon>list</md-icon>
        </md-button>
        <div style="position: absolute; bottom: 2px; transform: translateX(-50%); left: 50%">
          <span class="md-body-2 s1-U__text-color--dark-2">Resumo</span>
        </div>
      </div>
      <md-divider class="s1-U__full-width s1-U__mg--bt32"></md-divider>
      <div
        class="s1-U__text-align--center s1-U__pd--bt32 s1-U__flex-shrink-0"
        style="position: relative"
      >
        <md-button class="md-icon-button s1-md-bordered s1-loc__step-button">
          <md-icon>check_circle</md-icon>
        </md-button>
        <div style="position: absolute; bottom: 2px; transform: translateX(-50%); left: 50%">
          <span class="md-body-2 s1-U__text-color--dark-2">Conclusão</span>
        </div>
      </div>
      <md-divider class="s1-U__mg--bt32 s1-U__flex-shrink-0" style="width: 10vw"></md-divider>
    </div>

    <div class="s1-U__align-children--center s1-U__full-height">
      <div class="s1-U__full-height s1-U__bg-color--body-bg s1-U__flex-column" style="width: 70%">
        <div class="s1-U__flex-shrink-0 s1-U__pd16 s1-U__border--bottom1">
          <div class="s1-U__align-children--center s1-U__justify-content--space-between">
            <div class="s1-U__align-children--center">
              <md-button class="s1-md-bordered">
                <div class="s1-U__align-children--center">
                  <md-icon>filter_list</md-icon>
                  <span>Filtros</span>
                </div>
              </md-button>
              <div class="s1-U__vertical-divider s1-U__mg--lt16 s1-U__mg--rt16"></div>
              <div class="s1-U__align-children--center">
                <md-icon>sort_by_alpha</md-icon>
                <p class="md-body-2 s1-U__mg--lt4 s1-U__mg--rt8">Ordenar por:</p>
                <div class="s1-loc__md-field-wrapper s1-U__width--180px">
                  <md-field
                    :class="{'md-invalid' : $v.User.Form.Profile.$dirty && $v.User.Form.Profile.$invalid}"
                    class="s1-U__mg0"
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
              </div>
            </div>
            <div class="s1-U__text-align--right">
              <div class="s1-loc__md-field-wrapper s1-U__width--180px">
                <md-field
                  class="s1-U__mg0"
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
            </div>
          </div>
        </div>
        <div class="s1-U__align-children--center s1-U__full-height">
          <md-content
            class="md-scrollbar s1-U__pd0 s1-U__pd16 s1-U__full-height s1-U__bg-color--body-bg"
            style="overflow: auto"
          >
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae incidunt nemo cumque non laudantium deserunt nulla? Doloremque dolorum sed obcaecati, nihil, quis dolor animi id voluptate tempora voluptas cum porro at officia distinctio. Alias, ipsa pariatur nihil et repellendus doloremque rerum necessitatibus dolor ipsam facilis. Omnis enim assumenda quos illum dignissimos ut molestias ab, sed pariatur totam aut natus quas placeat similique rem explicabo cumque quod aliquid ipsa quae sequi dolorem, error ullam animi. Similique ratione tempore corrupti velit, itaque expedita facere, aut voluptatem alias facilis sapiente, libero suscipit rem harum placeat. Dicta quibusdam provident nihil assumenda consequuntur placeat delectus?</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae incidunt nemo cumque non laudantium deserunt nulla? Doloremque dolorum sed obcaecati, nihil, quis dolor animi id voluptate tempora voluptas cum porro at officia distinctio. Alias, ipsa pariatur nihil et repellendus doloremque rerum necessitatibus dolor ipsam facilis. Omnis enim assumenda quos illum dignissimos ut molestias ab, sed pariatur totam aut natus quas placeat similique rem explicabo cumque quod aliquid ipsa quae sequi dolorem, error ullam animi. Similique ratione tempore corrupti velit, itaque expedita facere, aut voluptatem alias facilis sapiente, libero suscipit rem harum placeat. Dicta quibusdam provident nihil assumenda consequuntur placeat delectus?</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae incidunt nemo cumque non laudantium deserunt nulla? Doloremque dolorum sed obcaecati, nihil, quis dolor animi id voluptate tempora voluptas cum porro at officia distinctio. Alias, ipsa pariatur nihil et repellendus doloremque rerum necessitatibus dolor ipsam facilis. Omnis enim assumenda quos illum dignissimos ut molestias ab, sed pariatur totam aut natus quas placeat similique rem explicabo cumque quod aliquid ipsa quae sequi dolorem, error ullam animi. Similique ratione tempore corrupti velit, itaque expedita facere, aut voluptatem alias facilis sapiente, libero suscipit rem harum placeat. Dicta quibusdam provident nihil assumenda consequuntur placeat delectus?</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae incidunt nemo cumque non laudantium deserunt nulla? Doloremque dolorum sed obcaecati, nihil, quis dolor animi id voluptate tempora voluptas cum porro at officia distinctio. Alias, ipsa pariatur nihil et repellendus doloremque rerum necessitatibus dolor ipsam facilis. Omnis enim assumenda quos illum dignissimos ut molestias ab, sed pariatur totam aut natus quas placeat similique rem explicabo cumque quod aliquid ipsa quae sequi dolorem, error ullam animi. Similique ratione tempore corrupti velit, itaque expedita facere, aut voluptatem alias facilis sapiente, libero suscipit rem harum placeat. Dicta quibusdam provident nihil assumenda consequuntur placeat delectus?</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae incidunt nemo cumque non laudantium deserunt nulla? Doloremque dolorum sed obcaecati, nihil, quis dolor animi id voluptate tempora voluptas cum porro at officia distinctio. Alias, ipsa pariatur nihil et repellendus doloremque rerum necessitatibus dolor ipsam facilis. Omnis enim assumenda quos illum dignissimos ut molestias ab, sed pariatur totam aut natus quas placeat similique rem explicabo cumque quod aliquid ipsa quae sequi dolorem, error ullam animi. Similique ratione tempore corrupti velit, itaque expedita facere, aut voluptatem alias facilis sapiente, libero suscipit rem harum placeat. Dicta quibusdam provident nihil assumenda consequuntur placeat delectus?</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae incidunt nemo cumque non laudantium deserunt nulla? Doloremque dolorum sed obcaecati, nihil, quis dolor animi id voluptate tempora voluptas cum porro at officia distinctio. Alias, ipsa pariatur nihil et repellendus doloremque rerum necessitatibus dolor ipsam facilis. Omnis enim assumenda quos illum dignissimos ut molestias ab, sed pariatur totam aut natus quas placeat similique rem explicabo cumque quod aliquid ipsa quae sequi dolorem, error ullam animi. Similique ratione tempore corrupti velit, itaque expedita facere, aut voluptatem alias facilis sapiente, libero suscipit rem harum placeat. Dicta quibusdam provident nihil assumenda consequuntur placeat delectus?</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae incidunt nemo cumque non laudantium deserunt nulla? Doloremque dolorum sed obcaecati, nihil, quis dolor animi id voluptate tempora voluptas cum porro at officia distinctio. Alias, ipsa pariatur nihil et repellendus doloremque rerum necessitatibus dolor ipsam facilis. Omnis enim assumenda quos illum dignissimos ut molestias ab, sed pariatur totam aut natus quas placeat similique rem explicabo cumque quod aliquid ipsa quae sequi dolorem, error ullam animi. Similique ratione tempore corrupti velit, itaque expedita facere, aut voluptatem alias facilis sapiente, libero suscipit rem harum placeat. Dicta quibusdam provident nihil assumenda consequuntur placeat delectus?</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae incidunt nemo cumque non laudantium deserunt nulla? Doloremque dolorum sed obcaecati, nihil, quis dolor animi id voluptate tempora voluptas cum porro at officia distinctio. Alias, ipsa pariatur nihil et repellendus doloremque rerum necessitatibus dolor ipsam facilis. Omnis enim assumenda quos illum dignissimos ut molestias ab, sed pariatur totam aut natus quas placeat similique rem explicabo cumque quod aliquid ipsa quae sequi dolorem, error ullam animi. Similique ratione tempore corrupti velit, itaque expedita facere, aut voluptatem alias facilis sapiente, libero suscipit rem harum placeat. Dicta quibusdam provident nihil assumenda consequuntur placeat delectus?</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae incidunt nemo cumque non laudantium deserunt nulla? Doloremque dolorum sed obcaecati, nihil, quis dolor animi id voluptate tempora voluptas cum porro at officia distinctio. Alias, ipsa pariatur nihil et repellendus doloremque rerum necessitatibus dolor ipsam facilis. Omnis enim assumenda quos illum dignissimos ut molestias ab, sed pariatur totam aut natus quas placeat similique rem explicabo cumque quod aliquid ipsa quae sequi dolorem, error ullam animi. Similique ratione tempore corrupti velit, itaque expedita facere, aut voluptatem alias facilis sapiente, libero suscipit rem harum placeat. Dicta quibusdam provident nihil assumenda consequuntur placeat delectus?</p>
          </md-content>
          <md-content
            class="md-scrollbar s1-U__pd0 s1-U__pd16 s1-U__full-height s1-U__bg-color--body-bg"
            style="overflow: auto"
          >
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae incidunt nemo cumque non laudantium deserunt nulla? Doloremque dolorum sed obcaecati, nihil, quis dolor animi id voluptate tempora voluptas cum porro at officia distinctio. Alias, ipsa pariatur nihil et repellendus doloremque rerum necessitatibus dolor ipsam facilis. Omnis enim assumenda quos illum dignissimos ut molestias ab, sed pariatur totam aut natus quas placeat similique rem explicabo cumque quod aliquid ipsa quae sequi dolorem, error ullam animi. Similique ratione tempore corrupti velit, itaque expedita facere, aut voluptatem alias facilis sapiente, libero suscipit rem harum placeat. Dicta quibusdam provident nihil assumenda consequuntur placeat delectus?</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae incidunt nemo cumque non laudantium deserunt nulla? Doloremque dolorum sed obcaecati, nihil, quis dolor animi id voluptate tempora voluptas cum porro at officia distinctio. Alias, ipsa pariatur nihil et repellendus doloremque rerum necessitatibus dolor ipsam facilis. Omnis enim assumenda quos illum dignissimos ut molestias ab, sed pariatur totam aut natus quas placeat similique rem explicabo cumque quod aliquid ipsa quae sequi dolorem, error ullam animi. Similique ratione tempore corrupti velit, itaque expedita facere, aut voluptatem alias facilis sapiente, libero suscipit rem harum placeat. Dicta quibusdam provident nihil assumenda consequuntur placeat delectus?</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae incidunt nemo cumque non laudantium deserunt nulla? Doloremque dolorum sed obcaecati, nihil, quis dolor animi id voluptate tempora voluptas cum porro at officia distinctio. Alias, ipsa pariatur nihil et repellendus doloremque rerum necessitatibus dolor ipsam facilis. Omnis enim assumenda quos illum dignissimos ut molestias ab, sed pariatur totam aut natus quas placeat similique rem explicabo cumque quod aliquid ipsa quae sequi dolorem, error ullam animi. Similique ratione tempore corrupti velit, itaque expedita facere, aut voluptatem alias facilis sapiente, libero suscipit rem harum placeat. Dicta quibusdam provident nihil assumenda consequuntur placeat delectus?</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae incidunt nemo cumque non laudantium deserunt nulla? Doloremque dolorum sed obcaecati, nihil, quis dolor animi id voluptate tempora voluptas cum porro at officia distinctio. Alias, ipsa pariatur nihil et repellendus doloremque rerum necessitatibus dolor ipsam facilis. Omnis enim assumenda quos illum dignissimos ut molestias ab, sed pariatur totam aut natus quas placeat similique rem explicabo cumque quod aliquid ipsa quae sequi dolorem, error ullam animi. Similique ratione tempore corrupti velit, itaque expedita facere, aut voluptatem alias facilis sapiente, libero suscipit rem harum placeat. Dicta quibusdam provident nihil assumenda consequuntur placeat delectus?</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae incidunt nemo cumque non laudantium deserunt nulla? Doloremque dolorum sed obcaecati, nihil, quis dolor animi id voluptate tempora voluptas cum porro at officia distinctio. Alias, ipsa pariatur nihil et repellendus doloremque rerum necessitatibus dolor ipsam facilis. Omnis enim assumenda quos illum dignissimos ut molestias ab, sed pariatur totam aut natus quas placeat similique rem explicabo cumque quod aliquid ipsa quae sequi dolorem, error ullam animi. Similique ratione tempore corrupti velit, itaque expedita facere, aut voluptatem alias facilis sapiente, libero suscipit rem harum placeat. Dicta quibusdam provident nihil assumenda consequuntur placeat delectus?</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae incidunt nemo cumque non laudantium deserunt nulla? Doloremque dolorum sed obcaecati, nihil, quis dolor animi id voluptate tempora voluptas cum porro at officia distinctio. Alias, ipsa pariatur nihil et repellendus doloremque rerum necessitatibus dolor ipsam facilis. Omnis enim assumenda quos illum dignissimos ut molestias ab, sed pariatur totam aut natus quas placeat similique rem explicabo cumque quod aliquid ipsa quae sequi dolorem, error ullam animi. Similique ratione tempore corrupti velit, itaque expedita facere, aut voluptatem alias facilis sapiente, libero suscipit rem harum placeat. Dicta quibusdam provident nihil assumenda consequuntur placeat delectus?</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae incidunt nemo cumque non laudantium deserunt nulla? Doloremque dolorum sed obcaecati, nihil, quis dolor animi id voluptate tempora voluptas cum porro at officia distinctio. Alias, ipsa pariatur nihil et repellendus doloremque rerum necessitatibus dolor ipsam facilis. Omnis enim assumenda quos illum dignissimos ut molestias ab, sed pariatur totam aut natus quas placeat similique rem explicabo cumque quod aliquid ipsa quae sequi dolorem, error ullam animi. Similique ratione tempore corrupti velit, itaque expedita facere, aut voluptatem alias facilis sapiente, libero suscipit rem harum placeat. Dicta quibusdam provident nihil assumenda consequuntur placeat delectus?</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae incidunt nemo cumque non laudantium deserunt nulla? Doloremque dolorum sed obcaecati, nihil, quis dolor animi id voluptate tempora voluptas cum porro at officia distinctio. Alias, ipsa pariatur nihil et repellendus doloremque rerum necessitatibus dolor ipsam facilis. Omnis enim assumenda quos illum dignissimos ut molestias ab, sed pariatur totam aut natus quas placeat similique rem explicabo cumque quod aliquid ipsa quae sequi dolorem, error ullam animi. Similique ratione tempore corrupti velit, itaque expedita facere, aut voluptatem alias facilis sapiente, libero suscipit rem harum placeat. Dicta quibusdam provident nihil assumenda consequuntur placeat delectus?</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae incidunt nemo cumque non laudantium deserunt nulla? Doloremque dolorum sed obcaecati, nihil, quis dolor animi id voluptate tempora voluptas cum porro at officia distinctio. Alias, ipsa pariatur nihil et repellendus doloremque rerum necessitatibus dolor ipsam facilis. Omnis enim assumenda quos illum dignissimos ut molestias ab, sed pariatur totam aut natus quas placeat similique rem explicabo cumque quod aliquid ipsa quae sequi dolorem, error ullam animi. Similique ratione tempore corrupti velit, itaque expedita facere, aut voluptatem alias facilis sapiente, libero suscipit rem harum placeat. Dicta quibusdam provident nihil assumenda consequuntur placeat delectus?</p>
          </md-content>
        </div>
      </div>
      <div class="s1-U__full-height s1-U__flex-column" style="width: 30%">
        <div
          class="s1-U__pd--tp8 s1-U__pd--bt8 s1-U__pd--lt16 s1-U__pd--rt16 s1-U__border-solid--1"
          style="border-width: 0 0 1px 1px"
        >
          <h3 class="md-title">Resumo</h3>
        </div>
        <md-content
          class="md-scrollbar s1-U__pd0 s1-U__pd16 s1-U__full-height s1-U__bg-color--body-bg s1-U__border-solid--1"
          style="overflow: auto; border-width: 0 0 0 1px"
        >
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae incidunt nemo cumque non laudantium deserunt nulla? Doloremque dolorum sed obcaecati, nihil, quis dolor animi id voluptate tempora voluptas cum porro at officia distinctio. Alias, ipsa pariatur nihil et repellendus doloremque rerum necessitatibus dolor ipsam facilis. Omnis enim assumenda quos illum dignissimos ut molestias ab, sed pariatur totam aut natus quas placeat similique rem explicabo cumque quod aliquid ipsa quae sequi dolorem, error ullam animi. Similique ratione tempore corrupti velit, itaque expedita facere, aut voluptatem alias facilis sapiente, libero suscipit rem harum placeat. Dicta quibusdam provident nihil assumenda consequuntur placeat delectus?</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae incidunt nemo cumque non laudantium deserunt nulla? Doloremque dolorum sed obcaecati, nihil, quis dolor animi id voluptate tempora voluptas cum porro at officia distinctio. Alias, ipsa pariatur nihil et repellendus doloremque rerum necessitatibus dolor ipsam facilis. Omnis enim assumenda quos illum dignissimos ut molestias ab, sed pariatur totam aut natus quas placeat similique rem explicabo cumque quod aliquid ipsa quae sequi dolorem, error ullam animi. Similique ratione tempore corrupti velit, itaque expedita facere, aut voluptatem alias facilis sapiente, libero suscipit rem harum placeat. Dicta quibusdam provident nihil assumenda consequuntur placeat delectus?</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae incidunt nemo cumque non laudantium deserunt nulla? Doloremque dolorum sed obcaecati, nihil, quis dolor animi id voluptate tempora voluptas cum porro at officia distinctio. Alias, ipsa pariatur nihil et repellendus doloremque rerum necessitatibus dolor ipsam facilis. Omnis enim assumenda quos illum dignissimos ut molestias ab, sed pariatur totam aut natus quas placeat similique rem explicabo cumque quod aliquid ipsa quae sequi dolorem, error ullam animi. Similique ratione tempore corrupti velit, itaque expedita facere, aut voluptatem alias facilis sapiente, libero suscipit rem harum placeat. Dicta quibusdam provident nihil assumenda consequuntur placeat delectus?</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae incidunt nemo cumque non laudantium deserunt nulla? Doloremque dolorum sed obcaecati, nihil, quis dolor animi id voluptate tempora voluptas cum porro at officia distinctio. Alias, ipsa pariatur nihil et repellendus doloremque rerum necessitatibus dolor ipsam facilis. Omnis enim assumenda quos illum dignissimos ut molestias ab, sed pariatur totam aut natus quas placeat similique rem explicabo cumque quod aliquid ipsa quae sequi dolorem, error ullam animi. Similique ratione tempore corrupti velit, itaque expedita facere, aut voluptatem alias facilis sapiente, libero suscipit rem harum placeat. Dicta quibusdam provident nihil assumenda consequuntur placeat delectus?</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae incidunt nemo cumque non laudantium deserunt nulla? Doloremque dolorum sed obcaecati, nihil, quis dolor animi id voluptate tempora voluptas cum porro at officia distinctio. Alias, ipsa pariatur nihil et repellendus doloremque rerum necessitatibus dolor ipsam facilis. Omnis enim assumenda quos illum dignissimos ut molestias ab, sed pariatur totam aut natus quas placeat similique rem explicabo cumque quod aliquid ipsa quae sequi dolorem, error ullam animi. Similique ratione tempore corrupti velit, itaque expedita facere, aut voluptatem alias facilis sapiente, libero suscipit rem harum placeat. Dicta quibusdam provident nihil assumenda consequuntur placeat delectus?</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae incidunt nemo cumque non laudantium deserunt nulla? Doloremque dolorum sed obcaecati, nihil, quis dolor animi id voluptate tempora voluptas cum porro at officia distinctio. Alias, ipsa pariatur nihil et repellendus doloremque rerum necessitatibus dolor ipsam facilis. Omnis enim assumenda quos illum dignissimos ut molestias ab, sed pariatur totam aut natus quas placeat similique rem explicabo cumque quod aliquid ipsa quae sequi dolorem, error ullam animi. Similique ratione tempore corrupti velit, itaque expedita facere, aut voluptatem alias facilis sapiente, libero suscipit rem harum placeat. Dicta quibusdam provident nihil assumenda consequuntur placeat delectus?</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae incidunt nemo cumque non laudantium deserunt nulla? Doloremque dolorum sed obcaecati, nihil, quis dolor animi id voluptate tempora voluptas cum porro at officia distinctio. Alias, ipsa pariatur nihil et repellendus doloremque rerum necessitatibus dolor ipsam facilis. Omnis enim assumenda quos illum dignissimos ut molestias ab, sed pariatur totam aut natus quas placeat similique rem explicabo cumque quod aliquid ipsa quae sequi dolorem, error ullam animi. Similique ratione tempore corrupti velit, itaque expedita facere, aut voluptatem alias facilis sapiente, libero suscipit rem harum placeat. Dicta quibusdam provident nihil assumenda consequuntur placeat delectus?</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae incidunt nemo cumque non laudantium deserunt nulla? Doloremque dolorum sed obcaecati, nihil, quis dolor animi id voluptate tempora voluptas cum porro at officia distinctio. Alias, ipsa pariatur nihil et repellendus doloremque rerum necessitatibus dolor ipsam facilis. Omnis enim assumenda quos illum dignissimos ut molestias ab, sed pariatur totam aut natus quas placeat similique rem explicabo cumque quod aliquid ipsa quae sequi dolorem, error ullam animi. Similique ratione tempore corrupti velit, itaque expedita facere, aut voluptatem alias facilis sapiente, libero suscipit rem harum placeat. Dicta quibusdam provident nihil assumenda consequuntur placeat delectus?</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae incidunt nemo cumque non laudantium deserunt nulla? Doloremque dolorum sed obcaecati, nihil, quis dolor animi id voluptate tempora voluptas cum porro at officia distinctio. Alias, ipsa pariatur nihil et repellendus doloremque rerum necessitatibus dolor ipsam facilis. Omnis enim assumenda quos illum dignissimos ut molestias ab, sed pariatur totam aut natus quas placeat similique rem explicabo cumque quod aliquid ipsa quae sequi dolorem, error ullam animi. Similique ratione tempore corrupti velit, itaque expedita facere, aut voluptatem alias facilis sapiente, libero suscipit rem harum placeat. Dicta quibusdam provident nihil assumenda consequuntur placeat delectus?</p>
        </md-content>
      </div>
    </div>
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
