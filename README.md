# 製作したアプリ概要
## 機能
プルダウンから宮城県の市町村を選択してデータ表示ボタンを押すことで、ローカルな配列に保存してある市町村コードとResas上にある市町村コードを照らし合わせて、市町村ごとに人口推移データを表示するアプリ
また、ローカル配列内に市町村のHPを格納してあり、データ表示と共に各市町村のHPへのリンクも表示される

## 使用API
* [RESAS-API](https://opendata.resas-portal.go.jp/docs/api/v1/index.html)

# vue-pug-sass-ts-proj README
## 概要
以下の環境をサポートするボイラープレートです
* [Vue](https://jp.vuejs.org/)
* [pug](https://pugjs.org/)
* [sass](http://sass-lang.com/)
* [TypeScript](https://www.typescriptlang.org/)

## 使用方法
1. 本プロジェクトをclone
1. `$ chmod +x ./install.sh; ./install.sh`
1. enjoy yourself

## ビルド方法
1. `$ npm run build`
1. `$ npm run dev`
1. ブラウザで [http://localhost:8000](http://localhost:8000) にアクセスする

## Page追加機能
Pugのページを `./scripts.sh` から追加できます
1. `$ ./scripts.sh add_page PageName`
    * ページの名前はアッパーキャメルケースにしてください
    * ページのファイル名はハイフネーションになります
    * ページをディレクトリ指定して追加できます
        * `$ ./scripts.sh add_page path/PageName`
1. ページに対応するpug, sass, tsが追加されます

## Component追加機能
Vueのコンポーネントを `./scripts.sh` から追加できます
1. `$ ./scripts.sh add_vue ComponentName`
    * コンポーネントの名前はアッパーキャメルケースにしてください
    * コンポーネントをディレクトリ指定して追加できます
        * `$ ./scripts.sh add_vue path/ComponentName`
1. コンポーネントに対応するpug, sass, tsが追加されます

## プロジェクト構成

```
* src/
    - プロジェクトのリソースを管理するディレクトリ

    * page/
        - pugディレクトリ
        - エントリポイントディレクトリ
    * styles/
        - 汎用sassディレクトリ
        entry/
            - エントリポイントディレクトリ
    * scripts/
        - 汎用typescriptディレクトリ
        entry/
            - エントリポイントディレクトリ
    * static/
        - favicon.ico等

    * components/
        - component用フォルダ

* dist/
    - コンパイル後のプロジェクトを配置するディレクトリ
```
