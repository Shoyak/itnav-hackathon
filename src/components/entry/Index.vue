<template lang='pug'>
.vue-index
    .reactive-title {{ reactiveTitle() }}
    h2 以下APIテスト
    ul
        li(v-for="character in characters") {{character.name}}
    button(@click="getCharacters")  button
</template>

<script lang='ts'>
import Vue from 'vue';
import Component from 'vue-class-component';
import VueUtil from '@/scripts/util/VueUtil';
import RootVue from '@/components/RootVue';
import Sample from '@/components/Sample.vue';
// Ajax通信ライブラリ
import Axios from 'axios';

/**
 * Vue Component
 */
@Component({})
export default class Index extends RootVue {
    public title: string = 'index';
    public characters = [
        {"name": ""}
    ];

    protected beforeCreate(): void {
        // Inner Vue 登録
        VueUtil.registerComponents([Sample]);
    }

    // apiからaxiosを用いて取得
    async getCharacters() {
        let url = 'https://gist.githubusercontent.com/anonymous/c41ae1698aca3595b95d1496ebf42d83/raw/2addeb281bcb4aae2be9c8204c0ec623c4cb446c/characters.json';
        // await Axios.get(url)
        // .then(x => {
        //     this.characters = x.data;
        // });

        // try chathバージョン
        try {
            let res = await Axios.get(url)
            this.characters = res.data
        } catch (e) {
            console.error(e)
        }
    }
}

</script>

<style lang='sass'>
@import '../../styles/color.sass'
@import '../../styles/common.sass'

.vue-index
</style>
