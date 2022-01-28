<template>
  <!--        <div class="echartLayout">-->
  <div id="sun" style="width:100%; height:100%; overflow: hidden "></div>
  <!--        </div>-->
</template>

<script>
import echarts from "echarts";
import { authorField as getAuthorFieldPaper } from "../../../network/author";
export default {
  name: "fieldGraph", // 研究方向发表论文统计
  data() {
    return {
      // fieldPaperData:{},
      realList: [],
      fieldData: [],
      fieldName: [],
      documentData: [],
      fieldPaperData: {}
    };
  },
  mounted: function() {
    getAuthorFieldPaper({
      params: {
        id: this.$route.params.id,
        db: this.$route.params.db
      }
    })
      .then(response => {
        this.fieldData = response.content.map(function(data) {
          return {
            field_id: data.fieldId,
            field_name: data.fieldName,
            activation: data.count,
            doc_count: data.count,
            db: data.db
          };
        });
        this.fieldData = this.fieldData.slice(0, 20);
        this.operateData();
        this.$nextTick(function() {
          this.getPie();
        });
      })
      .catch(error => {
        console.log(error);
      });
  },
  methods: {
    operateData() {
      let legenddata = this.fieldData;

      this.fieldData.map(field => {
        this.fieldName.push(field.field_name);
      });
    },
    getPie() {
      // 绘制图表
      var myChart = echarts.init(document.getElementById("sun"));
      var colors = ["#FFAE57", "#FF7853", "#EA5151", "#CC3F57", "#9A2555"];
      var bgColor = "#fff";

      let dataset = [];
      this.fieldData.forEach(field => {
        dataset.push([
          field.activation,
          field.doc_count,
          field.field_id,
          field.field_name
        ]);
        // dataset.push(field)
      });
      var option = {
        title: {
          text: "研究方向发表论文统计",
          top: "bottom",
          left: "right"
        },
        backgroundColor: bgColor,
        color: colors,
        tooltip: {
          trigger: "item",
          formatter(params) {
            return (
              params.data[3] +
              "</br>" +
              "领域活跃度：" +
              params.data[0] +
              "</br>" +
              "文章数：" +
              params.data[1] +
              "</br>"
            );
          }
        },
        dataset: {
          source: dataset
        },
        data: this.fieldName,
        calculable: true,
        series: [
          {
            name: "半径模式",
            type: "pie",
            clockWise: false,
            radius: [20, 100],
            center: ["50%", "50%"],
            roseType: "area",
            encode: {
              itemName: "FieldName",
              value: "DocCount"
            },
            itemStyle: {
              normal: {
                color: function(params) {
                  var colorList = [
                    "#a71a4f",
                    "#bc1540",
                    "#c71b1b",
                    "#d93824",
                    "#ce4018",
                    "#d15122",
                    "#e7741b",
                    "#e58b3d",
                    "#e59524",
                    "#dc9e31",
                    "#da9c2d",
                    "#d2b130",
                    "#bbd337",
                    "#8cc13f",
                    "#67b52d",
                    "#53b440",
                    "#48af54",
                    "#479c7f",
                    "#48a698",
                    "#57868c"
                  ];
                  return colorList[params.dataIndex];
                },
                label: {
                  formatter: function(params) {
                    return "文章数:" + params.data[1] + "篇";
                  },
                  normal: {
                    borderWidth: 0,
                    borderRadius: 4,
                    padding: [0, -50],
                    height: 40,
                    fontSize: 12,
                    align: "center",
                    rich: {
                      b: {
                        fontSize: 13,
                        lineHeight: 5,
                        color: "#41B3DC"
                      }
                    }
                  }
                },
                labelLine: {
                  normal: {
                    show: true,
                    length: 10,
                    length2: 10
                  },
                  emphasis: {
                    show: false
                  }
                }
              }
            }
          }
        ]
      };
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    }
  }
};
</script>

<style scoped></style>
