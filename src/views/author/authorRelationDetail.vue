<template>
  <div
    style="width:100%; height:1000px"
    v-title
    data-title="OASIS Author Relation"
  >
    <authorRelationShip></authorRelationShip>
  </div>
</template>

<script>
import authorRelationShip from "@/components/common/AuthorPortrait/authorRelationShip";
// import {authorRelation as getAuthorRelation} from  '@/api/author'

export default {
  data() {
    return {
      // relationData:{}
    };
  },
  created() {
    // console.log(this.$route.params.id);
  },
  components: {
    authorRelationShip
  },
  mounted() {
    this.initEchart();
  },
  methods: {
    initEchart() {
      // getAuthorRelation(this.$route.params.id).then(response=>{
      //     // console.log(response);
      //     this.relationData=response.data;
      // }).catch(error=>{
      //     console.log(error)
      // });
    }
  }
};
</script>

<style scoped></style>
