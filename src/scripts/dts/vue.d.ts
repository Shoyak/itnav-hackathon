declare module '*.vue' {
    import Vue from 'vue';
    export default Vue;
}

/**
 * Vueコンポーネント内でImgリソースを列挙するための型
 */
declare interface Imgs {
    [keys: string]: string
}


/**
 * Vueコンポーネント内でCitiesリソースを列挙するための型
 */
declare interface Cities {
    [keys: string]: any
}
