<template lang='pug'>
.vue-index
    select-city
    h2 人口推移
    ul
        li(v-for="population in populations") {{ population.year }}年 : {{ population.value }}人<br>

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
    public populations: any = [];
    private settingCondition: string = "population/composition/perYear?cityCode=04202&prefCode=4";

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
            console.log('body:', body.result.data);
            this.populations = body.result.data[0].data;
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
