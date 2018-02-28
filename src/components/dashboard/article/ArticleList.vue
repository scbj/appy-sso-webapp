<template lang="pug">
.article-list
  ArticleItem(
    v-for='article in $options.articles'
    :key='article.id'
    :content='article.content')
</template>

<script>
import ArticleItem from './ArticleItem'

const articles = [
  {
    id: 456,
    createdAt: new Date(),
    content: `<h3> Progress • Glisser-déposer</h3>
<p>Nemo quaeso miretur, si post exsudatos labores itinerum longos congestosque adfatim commeatus fiducia vestri ductante barbaricos pagos adventans velut mutato repente consilio ad placidiora deverti.</p>

<p>Quanta autem vis amicitiae sit, ex hoc <a href="#">intellegi maxime potest</a>, quod ex infinita societate generis humani, quam conciliavit ipsa natura, ita contracta res est et adducta in angustum ut omnis caritas aut inter duos aut inter paucos iungeretur.</p>`
  },
  {
    id: 654,
    createdAt: new Date(2018, 1, 12),
    content: `<h3>Tenez-vous au courant</h3>
    <h4>Lisez l'actualité d'Appy Pack dans la nouvelle version ☀</h4>
<p>Ut enim benefici liberalesque sumus, non ut exigamus gratiam (neque enim beneficium faeneramur sed natura propensi ad liberalitatem sumus), sic amicitiam non spe mercedis adducti sed quod omnis eius fructus in ipso amore inest, expetendam putamus :
    <ul>
        <li>Artem confingit anxia adhibetur sportularum debetur quaedam plene id adhibetur</li>
        <li>Restricte enim ne exiliter quid</li>
        <li>Eorum ab has <a href="#">sagulis errant</a></li>
        <li>Amicitiarum quando dicitur amicitiae amici</li>
    </ul>
</p>
<p>Tempore quo primis auspiciis in mundanum fulgorem surgeret victura dum erunt homines Roma, ut augeretur sublimibus incrementis, foedere pacis aeternae Virtus convenit atque Fortuna plerumque dissidentes, quarum si altera defuisset, ad perfectam non venerat summitatem.</p>`
  }
]

export default {
  articles,

  components: {
    ArticleItem
  }
}
</script>

<style lang="scss">
@import '../../../assets/scss/vars.scss';

.article-list {
  padding: 1rem 1rem;

  @media screen and (min-width: $mobile) {
    padding: 1rem 0;
  }
}
</style>
