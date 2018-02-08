<template lang='pug'>
.vue-index
    .reactive-title {{ reactiveTitle() }}
    h2 以下APIテスト
    ul
        li(v-for:"city in citys")
    button(@click="getData")  button
</template>

<script lang='ts'>
import Vue from 'vue';
import Component from 'vue-class-component';
import VueUtil from '@/scripts/util/VueUtil';
import RootVue from '@/components/RootVue';
import Sample from '@/components/Sample.vue';
// Ajax通信ライブラリ
import * as Request from 'request';
import { AsyncHook } from 'async_hooks';

/**
 * Vue Component
 */
@Component({})
export default class Index extends RootVue {
    public title: string = 'index';
    public citys: any = [];

    private settingResasApi(): any {
        const ENDPOINT = 'https://opendata.resas-portal.go.jp/api/v1/cities?prefCode=21';
        const APIKEY = 'oinv88HjwHSTNiNds00XVNPMjcpXedHNxMFj4ZfK';
        const headers = {
            'Content-Type':'application/json',
            'X-API-KEY': APIKEY
        }

        let url = ENDPOINT
        let options = {
            url: url,
            method: 'GET',
            headers: headers,
            json: true
        }
        return options
    }

    private getResasData(): any {
        Request(this.settingResasApi(), (error: string, response: any, body: any) => {
            console.log('error:', error);
            console.log('statusCode:', response && response.statusCode);
            console.log('body:', body.result);
            this.citys = body.result;
            console.log(this.citys[1]);
        });
    }

    protected beforeCreate(): void {
        // Inner Vue 登録
        VueUtil.registerComponents([Sample]);
    }

    async getData(): Promise<any> {
        try {
            await this.getResasData()
        } catch (err) {
            console.error();
        }
    }
}

</script>

<style lang='sass'>
@import '../../styles/color.sass'
@import '../../styles/common.sass'

.vue-index
</style>
