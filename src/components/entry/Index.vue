<template lang='pug'>
.vue-index
    select-prefecture
    select-city
    compare
    h2 以下APIテスト
    ul
        li(v-for="city in cities") {{ city.cityName }}<br>
    div {{ cities }}

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
// Ajax通信ライブラリ
import * as Request from 'request';
import { AsyncHook } from 'async_hooks';

/**
 * Vue Component
 */
@Component({})
export default class Index extends RootVue {
    public title: string = 'index';
    public cities: any = [];
    private settingCondition: string = "cities";

    private settingResasApi(): any {
        const ENDPOINT = 'https://opendata.resas-portal.go.jp/api/v1/';
        const APIKEY = 'oinv88HjwHSTNiNds00XVNPMjcpXedHNxMFj4ZfK';
        const headers = {
            'Content-Type':'application/json',
            'X-API-KEY': APIKEY
        }

        let url = ENDPOINT + this.settingCondition;
        let options = {
            url: url,
            method: 'GET',
            headers: headers,
            json: true
        }
        return options
    }

    private getResasData(): any {
        // アロー関数を用いて
        Request(this.settingResasApi(), (error: string, response: any, body: any) => {
            console.log('error:', error);
            console.log('statusCode:', response && response.statusCode);
            console.log('body:', body);
            this.cities = body.result;
            // apiから取得
            // console.log(this.cities[1]);
        });
    }

    async getData(): Promise<any> {
        try {
            await this.getResasData()
        } catch (err) {
            console.error();
        }
    }

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
