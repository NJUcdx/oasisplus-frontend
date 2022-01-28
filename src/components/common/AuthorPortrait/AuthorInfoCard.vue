<template>
    <div class="author-info-container" v-title :data-title="author.name">
        <el-card class="box-card card-left">
            <el-container class="author-top">
                <div class="author-photo">
                    <el-image
                            src=https://www.acemap.info/attachment/default/author.png
                    ></el-image>
                </div>
                <div class="author-introduce">
                    <div class="author-name">
                        {{author.name}}
                        <div>
                            <div  v-if="author.sameAuthors.length>0">
                                <a  style="font-size: 12px;line-height: 30px;font-weight: bolder;" >集成作者名称：</a>
                                <el-tag style="margin-left: 4px" type="info"  size="small" v-for="(keyword, index) in author.sameAuthors" :key="index" @click="toAuthor(keyword)">{{keyword}}</el-tag>
                            </div>
                            <div  v-else>
                                <a  style="font-size: 12px;line-height: 30px;font-weight: bolder;" >暂无集成作者</a>
                            </div>
                        </div>
                    </div>

                    <div class="author-descrip" v-for="(ins) in author.institution" :key="ins.id">
                        <i class="el-icon-office-building"></i>
                        <a :href="'/institution/'+ins.id+'/'+ins.db" target="_blank" >{{ins.name}}</a>
<!--                        <a >{{ins.name}}</a>-->

                    </div>
                    <!--                    小tag们-->
                    <div >

                        <div >
                            <a  style="font-size: 10px;line-height: 30px;font-weight: bolder;" >作者领域：</a>
                            <el-tag class="author-keyword"  type="info"  size="medium" v-for="(field) in authorFields" :key="field.id">{{field.name}} ;</el-tag>
                        </div>
                    </div>



                </div>
            </el-container>
            <el-container class="author-bottom">
                <div class="data">
                    <div style="font-size: x-large;margin-top: 25px">{{author.docCount}}</div>
                    <div style="font-size: smaller">papers</div>
                </div>
                <div class="data">
                    <div style="font-size: x-large;margin-top: 25px">{{author.totalCitations}}</div>
                    <div style="font-size: smaller">Citations</div>
                </div>
                <div class="data">
                    <div style="font-size: x-large;margin-top: 25px">{{geteffect}}</div>
                    <div style="font-size: smaller">Effect</div>
                </div>

                <div class="data">
                    <div style="font-size: x-large;margin-top: 25px">{{getActivation}}</div>
                    <div style="font-size: smaller">Activation</div>
                </div>

            </el-container>
        </el-card>
    </div>

</template>

<script>
    import {
        authorDetail,
        authorField,
        authorInfluence
    } from "../../../network/author";
    export default {
        name: "AuthorInfoCard",
        data(){
            return{
                // affiliationID:1,//需要一个可以根据作者id返回机构id的接口
                author:[]
            }
        },
        computed: {
            authorKeywords: function () {
                if (this.author.authorKeywords === "") return [];
                return (this.author.authorKeywords.split(";").filter(function (keyword) {
                    return keyword !== '';
                })).splice(0,6);
            },
            authorFields:function () {
                return (this.author.fieldList).slice(0,6);
            },
            getActivation:function(){
                //当activation为0时传过来console.log出来的是 undefined
                if(typeof(this.author.activation)=='undefined'){
                    return this.author.activation
                }else{
                    if(this.author.activation)
                        return this.author.activation.toFixed(2)
                    else
                        return 0
                }
            },
            geteffect:function () {
                if(this.author.effect)
                    return this.author.effect.toFixed(2)
                else
                    return 0
            }
        },
        methods:{
            toAuthor(tag) {
                console.log(tag)
                // window.open(this.$router.resolve('/field/'+tag).href, '_blank');
            },
        },
        mounted() {

            authorDetail({
                params: {
                    id: this.$route.params.id,
                    db: this.$route.params.db
                }
            }).then(res => {
                this.author = res.content;

                this.author.institution=this.author.institution.slice(0,3);
                this.author.fieldList=this.author.fieldList.slice(0,10)
                console.log(this.author)
                // this.author.effect =0
                authorInfluence({
                    params: {
                        id: this.$route.params.id,
                        db: this.$route.params.db
                    }
                }).then(res => {
                    // this.author.push({'effect':res.content.influence});
                    // this.author.effect = res.content.influence;
                    this.$set(this.author,'effect',res.content.influence)
                });
            });
            authorField({
                params: {
                    id: this.$route.params.id,
                    db: this.$route.params.db
                }
            }).then(res => {
                this.author.fieldList = res.content.map(function(data) {
                    return {
                        name: data.fieldName,
                        docCount: data.count,
                        db: data.db,
                        id: data.fieldId
                    };
                });
            });
        },
        // props:['author']

    }
</script>

<style scoped>
    .author-info-container{
        display: flex;
        justify-content: space-between;
    }
    .box-card {
        text-align: left;
        margin: 40px;
        width: 100%;
        /*height: 300px;*/

    }
    .author-top{
        align-items: center;
    }
    .author-photo{
        width: 80px;
        margin-top: 0px;
    }
    .el-image{
        border-radius: 100px;
    }
    .author-introduce{
        padding-left: 16px;
        box-sizing: border-box;
        min-width: 250px;
    }
    .author-name{
        font-size: x-large;
    }
    .author-descrip{
        margin: 5px;
        font-size: smaller;
    }
    .author-field{
        margin: 5px;
    }
    .author-keyword{
        /*float: left;*/
        margin: 0 0 3px;
        background-color:transparent;
        border-color:transparent;
        font-weight: bolder;
    }

    .author-bottom{
        margin-top: 30px;
        width: 100%;
        height: 90px;
        background: #f9fafc;
    }
    .data{
        width: 33%;
        height: 100%;
        text-align: center;
    }
</style>