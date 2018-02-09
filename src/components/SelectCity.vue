<template lang='pug'>
.vue-select-city
    h2 ▼市町村
    select(v-model="selected")
        option(v-for="city in cities" v-bind:value="city.cityCode") {{ city.cityName }}
    span 選択されたprefCode: {{ selected }}
    a(v-bind:href="searchedCityUrl")  {{ searchedCityUrl }}
    button(@click="check") check

    //- citiesの中身を列挙 cityNameを表示
    //- ul
    //-     li(v-for="city in cities") {{ city.cityName }}<br>
    //- button(@click="checkCities") check2
</template>

<script lang='ts'>
import Vue from 'vue';
import Component from 'vue-class-component';
import VueUtil from '@/scripts/util/VueUtil';

/**
 * Vue Component
 */
@Component({})
export default class SelectCity extends Vue {
    private selected: string = "選択してください";
    private searchedCityUrl: string = "";
    private cities: Cities = [
        { "cityCode": "04100", "cityName": "仙台市", "cityUrl": "https://ja.wikipedia.org/wiki/%E4%BB%99%E5%8F%B0%E5%B8%82" },
        { "cityCode": "04101", "cityName": "仙台市青葉区", "cityUrl": "" },
        { "cityCode": "04102", "cityName": "仙台市宮城野区", "cityUrl": "" },
        { "cityCode": "04103", "cityName": "仙台市若林区", "cityUrl": "" },
        { "cityCode": "04104", "cityName": "仙台市太白区", "cityUrl": "" },
        { "cityCode": "04105", "cityName": "仙台市泉区", "cityUrl": "" },
        { "cityCode": "04202", "cityName": "石巻市", "cityUrl": "" },
        { "cityCode": "04203", "cityName": "塩竈市", "cityUrl": "" },
        { "cityCode": "04205", "cityName": "気仙沼市", "cityUrl": "" },
        { "cityCode": "04206", "cityName": "白石市", "cityUrl": "" },
        { "cityCode": "04207", "cityName": "名取市", "cityUrl": "" },
        { "cityCode": "04208", "cityName": "角田市", "cityUrl": "" },
        { "cityCode": "04209", "cityName": "多賀城市", "cityUrl": "" },
        { "cityCode": "04211", "cityName": "岩沼市", "cityUrl": "" },
        { "cityCode": "04212", "cityName": "登米市", "cityUrl": "" },
        { "cityCode": "04213", "cityName": "栗原市", "cityUrl": "" },
        { "cityCode": "04214", "cityName": "東松島市", "cityUrl": "" },
        { "cityCode": "04215", "cityName": "大崎市", "cityUrl": "" },
        { "cityCode": "04301", "cityName": "蔵王町", "cityUrl": "" },
        { "cityCode": "04302", "cityName": "七ヶ宿町", "cityUrl": "" },
        { "cityCode": "04321", "cityName": "大河原町", "cityUrl": "" },
        { "cityCode": "04322", "cityName": "村田町", "cityUrl": "" },
        { "cityCode": "04323", "cityName": "柴田町", "cityUrl": "" },
        { "cityCode": "04324", "cityName": "川崎町", "cityUrl": "" },
        { "cityCode": "04341", "cityName": "丸森町", "cityUrl": "" },
        { "cityCode": "04361", "cityName": "亘理町", "cityUrl": "" },
        { "cityCode": "04362", "cityName": "山元町", "cityUrl": "" },
        { "cityCode": "04401", "cityName": "松島町", "cityUrl": "" },
        { "cityCode": "04404", "cityName": "七ヶ浜町", "cityUrl": "" },
        { "cityCode": "04406", "cityName": "利府町", "cityUrl": "" },
        { "cityCode": "04421", "cityName": "大和町", "cityUrl": "" },
        { "cityCode": "04422", "cityName": "大郷町", "cityUrl": "" },
        { "cityCode": "04423", "cityName": "富谷町", "cityUrl": "" },
        { "cityCode": "04424", "cityName": "大衡村", "cityUrl": "" },
        { "cityCode": "04444", "cityName": "色麻町", "cityUrl": "" },
        { "cityCode": "04445", "cityName": "加美町", "cityUrl": "" },
        { "cityCode": "04501", "cityName": "涌谷町", "cityUrl": "" },
        { "cityCode": "04505", "cityName": "美里町", "cityUrl": "" },
        { "cityCode": "04581", "cityName": "女川町", "cityUrl": "" },
        { "cityCode": "04606", "cityName": "南三陸町", "cityUrl": "" }
    ];

    private check() {
        // 検索したいcityCode入れる
        let searchCityCode = this.selected;
        // 選択されたものを検索する
        let citySelected = this.cities.filter((value: any, index: any, array: any) => {
            // cityCodeの指定
            if( value.cityCode == searchCityCode ) {
                return true;
            }
            return false;
        });
        // 検索対象のcityCode表示
        this.searchedCityUrl = citySelected[0].cityUrl;
        console.log(this.searchedCityUrl);
    }
}
</script>

<style lang='sass' scoped>
.vue-select-city
</style>

