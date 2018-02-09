<template lang='pug'>
.vue-index
    select-city

    button(@click="getData")  button
</template>

<script lang='ts'>
import Vue from 'vue';
import Component from 'vue-class-component';
import VueUtil from '@/scripts/util/VueUtil';
import RootVue from '@/components/RootVue';
import Sample from '@/components/Sample.vue';
import SelectPrefecture from '@/components/SelectPrefecture.vue';
import SelectCity from '@/components/SelectCity.vue';
import Compare from '@/components/Compare.vue';


/**
 * Vue Component
 */
@Component({})
export default class Index extends RootVue {
    public title: string = 'index';

    protected beforeCreate(): void {
        // Inner Vue 登録
        VueUtil.registerComponents([Sample,SelectPrefecture, SelectCity, Compare]);
    }
}

</script>

<style lang='sass'>
@import '../../styles/color.sass'
@import '../../styles/common.sass'

.vue-index
</style>
