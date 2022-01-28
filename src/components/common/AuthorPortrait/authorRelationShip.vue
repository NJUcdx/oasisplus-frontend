<template>
  <div
    id="authorRelationContainer"
    style="width:100%; height:100%; overflow: hidden "
  ></div>
</template>

<script>
import echarts from "echarts";
import {
  authorRelation as getAuthorRelation,
  coworkerRecommend as getCoworkerRecommend
} from "../../../network/author";

export default {
  name: "authorRelation",
  props: {
    isPrview: {
      //如果是预览图，不会点击节点跳转
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      myChart: null,
      relationArray: {},
      coworkerRecommend: [],
      coworkerLimitNum: 10,
      chartData: [],
      chartLink: [],
      categoryArray: [],
      w: 400,
      h: 300
    };
  },
  mounted() {
    this.loadData();
  },
  methods: {
    loadData() {
      this.categoryArray = [];
      this.relationArray = {
        edges: [
          {
            content: {
              commonWorks: 1,
              worksUrl: "/document/fetch?keywords=Min Zhou Ming Gu"
            },
            v1: 0,
            v2: 1,
            weight: 1
          },
          {
            content: {
              commonWorks: 2,
              worksUrl: "/document/fetch?keywords=Min Zhou Ming Gu"
            },
            v1: 0,
            v2: 2,
            weight: 2
          },
          {
            content: {
              commonWorks: 2,
              worksUrl: "/document/fetch?keywords=Min Zhou Ming Gu"
            },
            v1: 2,
            v2: 3,
            weight: 2
          }
        ],
        veticles: [
          {
            category: 0,
            content: {
              activation: 18.0631,
              affiliation: "Tsinghua University",
              affiliationId: 3,
              documentCount: 14,
              id: 10474,
              name: "Hongyu Zhang",
              db: "ACM"
            },
            core: true,
            id: 0
          },
          {
            category: 1,
            content: {
              activation: 3.4167,
              affiliation: "ssTsinghua University",
              affiliationId: 3,
              documentCount: 4,
              id: 10451,
              name: "Min Zhou",
              db: "ACM"
            },
            core: false,
            id: 1
          },
          {
            category: 2,
            content: {
              activation: 3.4167,
              affiliation: "aaaTsinghua University",
              affiliationId: 3,
              documentCount: 4,
              id: 10451,
              name: "a",
              db: "ACM"
            },
            core: false,
            id: 2
          },
          {
            category: 0,
            content: {
              activation: 3.4167,
              affiliation: "Tsinghua University",
              affiliationId: 3,
              documentCount: 4,
              id: 10451,
              name: "bbbb",
              db: "ACM"
            },
            core: false,
            id: 300
          }
        ]
      };
      this.coworkerRecommend = [
        {
          category: 1,
          affiliationId: 41,
          affiliationName: "Nanyang Technological University, Singapore",
          authorName: "Yang Liu",
          id: 10551,
          activation: 1.168049918054721,
          db: "ACM"
        },
        {
          category: 0,
          affiliationId: 3,
          affiliationName: "Tsinghua University",
          authorName: "Jiaguang Sun",
          id: 10453,
          activation: 1,
          db: "ACM"
        }
      ];
      // this.initEchart()
      // // 获取作者关系
      getAuthorRelation({
        params: {
          id: this.$route.params.id,
          db: this.$route.params.db
        }
      })
        .then(response => {
          this.relationArray = response.content;
          // console.log(this.relationArray.veticles)
          // this.relationArray = response.data
          //   console.log("作者关系")
          //   console.log(response.data)

          // 获取潜在合作者推荐
          getCoworkerRecommend({
            params: {
              id: this.$route.params.id,
              db: this.$route.params.db
            }
          })
            .then(response => {
              this.coworkerRecommend = response.content;
              // console.log(this.coworkerRecommend);
              this.initEchart();
            })
            .catch(error => {
              console.log(error);
            });
        })
        .catch(error => {
          console.log(error);
        });
    },
    initEchart() {
      // console.log(this.relationArray);
      let dom = document.getElementById("authorRelationContainer");
      this.myChart = echarts.init(dom);
      this.chartData = this.getData(this.relationArray.veticles);
      this.chartLink = this.getRelation(this.relationArray.edges);
      this.categories = this.categoryArray;
      // let routeTemp=this.$route;
      let option = {
        title: {
          text: "作者关系图谱",
          subtext: "Default layout",
          top: "bottom",
          left: "right"
        },
        tooltip: {},
        legend: {
          // x: "left",
          type: "scroll",
          orient: "vertical",
          left: 10,
          top: 20,
          bottom: 20,
          data: this.categories.map(function(a) {
            //显示策略
            return a.name;
          }),
          selected: this.selectedcategoryArray
        },
        series: [
          {
            categories: this.categories,
            name: "Author Relationship",
            edgeLabel: {
              //关系注释
              normal: {
                formatter: "{c}",
                show: true
              }
            },
            edgeSymbol: "circle",
            // force:{//点之间的距离
            //     repulsion:3000
            // },
            force: {
              //力引导图基本配置
              //initLayout: ,//力引导的初始化布局，默认使用xy轴的标点
              repulsion: 800, //节点之间的斥力因子。支持数组表达斥力范围，值越大斥力越大。
              gravity: 0.03, //节点受到的向中心的引力因子。该值越大节点越往中心点靠拢。
              edgeLength: 400, //边的两个节点之间的距离，这个距离也会受 repulsion。[10, 50] 。值越小则长度越长
              layoutAnimation: true
              //因为力引导布局会在多次迭代后才会稳定，这个参数决定是否显示布局的迭代动画，在浏览器端节点数据较多（>100）的时候不建议关闭，布局过程会造成浏览器假死。
            },
            layout: "force", //点之间的距离
            roam: true,
            itemStyle: {
              //球颜色
              normal: {},

              //鼠标放上去有阴影效果
              emphasis: {
                shadowColor: "#b5c2db",
                shadowOffsetX: 0, //阴影方向
                shadowOffsetY: 0,
                shadowBlur: 20 //阴影大小
              }
            },
            label: {
              normal: {
                show: true //球上的名字
              }
            },

            symbolSize: value => {
              return value * 7;
            }, //球的大小
            type: "graph",
            links: this.chartLink, //关系源
            data: this.chartData, //数据源
            focusNodeAdjacency: true, //鼠标移上去高亮相关人
            lineStyle: {
              color: "source", //线和源同色
              curveness: 0.3 //线弯曲程度
            },
            emphasis: {
              lineStyle: {
                width: 8 //鼠标移上去后线的宽度
              }
            },
            animationDelay: function(idx) {
              // if(that.chartData[idx].value ==='潜在合作者关系')
            }
          }
        ]
        // animationDuration: 1500,
        // animationEasingUpdate: 'quinticInOut',
      };
      this.myChart.setOption(option);
      this.myChart.on("click", param => {
        if (!this.isPrview && param.dataType === "node") {
          let routeData = this.$router.resolve({
            path: "/author/" + param.data.authorId + "/" + param.data.db
          });
          window.open(routeData.href, "_blank");
        }
      });
    },
    goAuthor(id) {
      window.open(this.$router.resolve("/author/" + id).href, "_blank");
    },
    getData(input) {
      let data = [];
      let categoryArrayTemp = [];
      let item;
      // console.log(input);
      // 作者关系数据
      for (item of input) {
        // console.log(item)
        item.content.activation = item.content.activation + 2;
        data.push({
          category: item.content.affiliation || "暂无机构信息",
          name: item.content.name,
          value: item.content.activation,
          id: item.id,
          authorId: item.content.id,
          db: item.content.db
        });
        if (item.content.affiliation.length > 0)
          categoryArrayTemp.push(item.content.affiliation);
        else {
          categoryArrayTemp.push("暂无机构信息");
        }
      }
      const scale = 2;
      // let categorytempcount = [...new Set(categoryArrayTemp)].length;
      let id = data.length;
      // 潜在合作者数据
      this.coworkerRecommend.map(recommend => {
        // console.log(recommend);
        if (recommend.activation < 2) recommend.activation = 2;
        data.push({
          // category: recommend.category,
          category: "潜在合作者",
          name: recommend.authorName,
          value: (recommend.activation * scale).toFixed(2),
          id: id++,
          authorId: recommend.id,
          db: recommend.db,
          symbol: "pin"
        });
        // categoryArrayTemp.push("潜在合作者");
      });
      let temp = [...new Set(categoryArrayTemp)];
      if (this.coworkerRecommend.length > 0) temp = ["潜在合作者", ...temp];

      this.selectedcategoryArray = {};
      for (item of temp) {
        this.categoryArray.push({ name: item });
      }
      //预览只显示3个图例
      if (this.isPrview && this.categoryArray.length > 0) {
        for (var i = 3; i < this.categoryArray.length; i++)
          this.categoryArray[i] = "";
      }
      //第15个机构及之后初加载不显示
      for (let i = 0; i < this.categoryArray.length; i++) {
        this.selectedcategoryArray[this.categoryArray[i].name] = i < 15;
      }
      return data;
    },
    getRelation(input) {
      let data = [];
      let item;
      for (item of input) {
        data.push({
          source: item.v1,
          target: item.v2,
          weight: 2,
          value: "合作项目数：" + item.content.commonWorks
        });
      }
      let size = this.relationArray.veticles.length;
      this.coworkerRecommend.map(() => {
        data.push({
          source: size++,
          target: 0,
          weight: 2,
          value: "潜在合作者关系"
        });
      });
      return data;
    }
  },
  watch: {
    $route() {
      this.loadData();
    }
  }
};
</script>

<style scoped></style>
