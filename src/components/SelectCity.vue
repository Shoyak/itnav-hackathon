<template lang='pug'>
.vue-select-city
    h1 宮城県市町村データ取得app
    .searchSec
        h2 市町村選択
        select(v-model="selected")
            option(v-for="city in cities" v-bind:value="city.cityCode") {{ city.cityName }}
    button(@click="getData") データ表示

    .resultSec
        h2() {{ searchCityName }}人口推移(予想含む)
        ul
            li(v-for="population in populations") {{ population.year }}年 : {{ population.value }}人<br>

        span City URL :
            a(v-bind:href="searchedCityUrl") {{ searchedCityUrl }}
    p 出典：RESAS（地域経済分析システム）
</template>

<script lang='ts'>
import Vue from 'vue';
import Component from 'vue-class-component';
import VueUtil from '@/scripts/util/VueUtil';
// Ajax通信ライブラリ
import * as Request from 'request';
import { AsyncHook } from 'async_hooks';

/**
 * Vue Component
 */
@Component({})
export default class SelectCity extends Vue {
    private selected: string = "選択してください";
    private searchedCityUrl: string = "";
    private populations: object = [];
    private searchCityName: string = "";
    // API検索用変数
    private searchCityCode = "";
    private searchPrefCode = "";
    private settingCondition: string = "";


    private cities: Cities = [
        { "prefCode": 4, "cityCode": "04100", "cityName": "仙台市", "cityUrl": "https://www.city.sendai.jp/" },
        { "prefCode": 4, "cityCode": "04101", "cityName": "仙台市青葉区", "cityUrl": "https://www.city.sendai.jp/" },
        { "prefCode": 4, "cityCode": "04102", "cityName": "仙台市宮城野区", "cityUrl": "https://www.city.sendai.jp/" },
        { "prefCode": 4, "cityCode": "04103", "cityName": "仙台市若林区", "cityUrl": "https://www.city.sendai.jp/" },
        { "prefCode": 4, "cityCode": "04104", "cityName": "仙台市太白区", "cityUrl": "https://www.city.sendai.jp/" },
        { "prefCode": 4, "cityCode": "04105", "cityName": "仙台市泉区", "cityUrl": "https://www.city.sendai.jp/" },
        { "prefCode": 4, "cityCode": "04202", "cityName": "石巻市", "cityUrl": "http://www.city.ishinomaki.lg.jp/" },
        { "prefCode": 4, "cityCode": "04203", "cityName": "塩竈市", "cityUrl": "https://www.city.shiogama.miyagi.jp/" },
        { "prefCode": 4, "cityCode": "04205", "cityName": "気仙沼市", "cityUrl": "http://www.kesennuma.miyagi.jp/" },
        { "prefCode": 4, "cityCode": "04206", "cityName": "白石市", "cityUrl": "http://www.city.shiroishi.miyagi.jp/" },
        { "prefCode": 4, "cityCode": "04207", "cityName": "名取市", "cityUrl": "http://www.city.natori.miyagi.jp/" },
        { "prefCode": 4, "cityCode": "04208", "cityName": "角田市", "cityUrl": "http://www.city.kakuda.lg.jp/" },
        { "prefCode": 4, "cityCode": "04209", "cityName": "多賀城市", "cityUrl": "http://www.city.tagajo.miyagi.jp/index.html" },
        { "prefCode": 4, "cityCode": "04211", "cityName": "岩沼市", "cityUrl": "https://www.city.iwanuma.miyagi.jp/" },
        { "prefCode": 4, "cityCode": "04212", "cityName": "登米市", "cityUrl": "http://www.city.tome.miyagi.jp/" },
        { "prefCode": 4, "cityCode": "04213", "cityName": "栗原市", "cityUrl": "http://www.kuriharacity.jp/" },
        { "prefCode": 4, "cityCode": "04214", "cityName": "東松島市", "cityUrl": "http://www.city.higashimatsushima.miyagi.jp/" },
        { "prefCode": 4, "cityCode": "04215", "cityName": "大崎市", "cityUrl": "http://www.city.osaki.miyagi.jp/" },
        { "prefCode": 4, "cityCode": "04301", "cityName": "蔵王町", "cityUrl": "http://www.town.zao.miyagi.jp/" },
        { "prefCode": 4, "cityCode": "04302", "cityName": "七ヶ宿町", "cityUrl": "http://www.town.shichikashuku.miyagi.jp/" },
        { "prefCode": 4, "cityCode": "04321", "cityName": "大河原町", "cityUrl": "http://www.town.ogawara.miyagi.jp/" },
        { "prefCode": 4, "cityCode": "04322", "cityName": "村田町", "cityUrl": "http://www.town.murata.miyagi.jp/" },
        { "prefCode": 4, "cityCode": "04323", "cityName": "柴田町", "cityUrl": "http://www.town.shibata.miyagi.jp/" },
        { "prefCode": 4, "cityCode": "04324", "cityName": "川崎町", "cityUrl": "http://www.town.kawasaki.miyagi.jp/" },
        { "prefCode": 4, "cityCode": "04341", "cityName": "丸森町", "cityUrl": "http://www.town.marumori.miyagi.jp/" },
        { "prefCode": 4, "cityCode": "04361", "cityName": "亘理町", "cityUrl": "https://www.town.watari.miyagi.jp/" },
        { "prefCode": 4, "cityCode": "04362", "cityName": "山元町", "cityUrl": "http://www.town.yamamoto.miyagi.jp/" },
        { "prefCode": 4, "cityCode": "04401", "cityName": "松島町", "cityUrl": "http://www.town.matsushima.miyagi.jp/" },
        { "prefCode": 4, "cityCode": "04404", "cityName": "七ヶ浜町", "cityUrl": "https://www.shichigahama.com/" },
        { "prefCode": 4, "cityCode": "04406", "cityName": "利府町", "cityUrl": "http://www.town.rifu.miyagi.jp/" },
        { "prefCode": 4, "cityCode": "04421", "cityName": "大和町", "cityUrl": "https://www.town.taiwa.miyagi.jp/" },
        { "prefCode": 4, "cityCode": "04422", "cityName": "大郷町", "cityUrl": "https://www.town.miyagi-osato.lg.jp/" },
        { "prefCode": 4, "cityCode": "04423", "cityName": "富谷町", "cityUrl": "http://www.tomiya-city.miyagi.jp/" },
        { "prefCode": 4, "cityCode": "04424", "cityName": "大衡村", "cityUrl": "http://www.village.ohira.miyagi.jp/" },
        { "prefCode": 4, "cityCode": "04444", "cityName": "色麻町", "cityUrl": "http://www.town.shikama.miyagi.jp/" },
        { "prefCode": 4, "cityCode": "04445", "cityName": "加美町", "cityUrl": "http://www.town.kami.miyagi.jp/" },
        { "prefCode": 4, "cityCode": "04501", "cityName": "涌谷町", "cityUrl": "http://www.town.wakuya.miyagi.jp/" },
        { "prefCode": 4, "cityCode": "04505", "cityName": "美里町", "cityUrl": "http://www.town.misato.miyagi.jp/" },
        { "prefCode": 4, "cityCode": "04581", "cityName": "女川町", "cityUrl": "http://www.town.onagawa.miyagi.jp/" },
        { "prefCode": 4, "cityCode": "04606", "cityName": "南三陸町", "cityUrl": "https://www.town.minamisanriku.miyagi.jp/" }
    ];

    private check() {
        // 検索したいcityCode入れる
        let searchCityCode = this.selected;

        // 選択されたものを検索する
        let citySelected = this.cities.filter((value: Cities, index: number, array: object) => {
            // cityCodeの指定
            if( value.cityCode == searchCityCode ) {
                return true;
            }
            return false;
        });

        this.searchCityName = citySelected[0].cityName;

        // 検索対象のcityCode表示
        this.searchedCityUrl = citySelected[0].cityUrl;
        this.searchPrefCode = citySelected[0].prefCode;
        this.searchCityCode = citySelected[0].cityCode;
        console.log(this.searchedCityUrl);
        this.settingCondition = "population/composition/perYear?cityCode=" + this.searchCityCode + "&prefCode=" + this.searchPrefCode;
    }

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

    private getResasData(): void {
        console.log(this.settingCondition);
        // アロー関数を用いて
        Request(this.settingResasApi(), (error: string, response: any, body: any) => {
            console.log('error:', error);
            console.log('statusCode:', response && response.statusCode);
            console.log('body:', body);
            // this.populations = body.result.data[0].data;
            this.populations = body.result.data[0].data;
            console.log(this.populations)
        });

    }

    async getData(): Promise<void> {
        try {
            await this.check()
            await this.getResasData()
        } catch (err) {
            console.error();
        }
    }
}
</script>

<style lang='sass' scoped>
.vue-select-city
    width: 420px
    padding: 32px
    margin: 0 auto
    display: flex
    flex-direction: column
    justify-content: center

    h1
        font-size: 2.4rem
        text-align: center

    h2
        font-size: 1.8rem

    & > div
        padding: 12px
        display: flex
        flex-direction: column
        &.searchSec
            align-items: center

        & > select
           height: 3rem
           width: 14rem


        & > ul, & > span
            list-style: none
            padding: 1rem

    button
        padding: 5px
        background: #f8f8f8
        border-radius: 5px
        margin: 12px

    & > p
        font-size: 1rem
        text-align: right
</style>

