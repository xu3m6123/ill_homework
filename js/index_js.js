

const illdata = d3.json("/js/Day_19CoV.json").then(function (data) {
    var width = 1200;
    var height = 400;

    const d3caseAmount = d3.select("#cD_caseAmount")
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .style("background-color", "rgb(255,255,255)");

    const heightScale = d3.scaleLinear()//line chart data height
        .domain([0, 700])
        .range([0, height]);

    const yAxisOrder = d3.scaleLinear()//尺標線方法
        .domain([700, 0])
        .range([0, height])
    const yAxis = d3.axisRight(yAxisOrder)
        .tickSize(width, 0)
        .ticks(10);//尺標線數量


    const rectColor = d3.scaleLinear()//顏色
        .domain([0, 700])
        .range(["rgb(252,234,144)", "rgb(237,97,27)"]);

    var cc = data.filter(function (d) { return d.是否為境外移入 === "否" })//篩選境內
    console.log(cc);

    var result = Object.values(cc.reduce((r, o,) => {//找出相同時間，總計病例數
        r[o.個案研判日] = r[o.個案研判日] || { 個案研判日: o.個案研判日, 確定病例數: 0 };
        r[o.個案研判日].確定病例數 += +o.確定病例數;
        return r;
    }, {}));

    console.log(result);//輸出篩選時間



    const pbar = d3caseAmount.selectAll("text")//確診周別
        .data(result)
        .enter()
        .append("text")
        .text(function (d, i) { if (parseInt(d.個案研判日) >= 0) { return d.個案研判日 } else { return "" } })
        .attr("x", function (d, i) { return i * ((width - 100) / result.length) + 30; })
        .attr("y", height - 5)
        .attr("fill", "rgb(80,80,80)")
        .style("font-size", "10");
    const vbar = d3caseAmount.append("g")//畫尺標線
        .attr("transform", `translate(-40,-20)`)
        .call(yAxis)
        .attr('stroke-width', '0.5');

    const bar = d3caseAmount.selectAll("rect")//我是善良長條圖
        .data(result)
        .enter()
        //.filter(function(d){return d.是否為境外移入==="否"})//篩選
        //.filter(function(d){return parseInt(d.發病週別)>20})//篩選
        .append("rect")
        .attr("class", "illeffect")
        .attr("width", (width / result.length) - 30)
        .attr("height", function (d, i) { return heightScale(result[i].確定病例數); })
        .attr("x", function (d, i) { return i * ((width - 100) / result.length) + 40; })//x軸起始位置向右偏移100，向右偏移20
        .attr("y", function (d, i) { return height - 20 - heightScale(result[i].確定病例數) })//y軸視覺為由下往上長，向上偏移20
        .attr("fill", function (d, i) { return rectColor(parseInt(result[i].確定病例數)); })
        .attr("id", function (d, i) { return i;  })
        .on("mouseover", circleMouseOver)
        .on("mouseout", circleMouseOut);        

    d3caseAmount.selectAll("text2")//顯示文字，增加class
        .data(result)
        .enter()
        .append("text")
        .text(function (d, i) { return "當日境內病例數:" + d.確定病例數 + "件" })
        .attr("x", function (d, i) { return ((i * ((width - 100) / result.length)) + 40) -20})
        .attr("y", function (d, i) { return height - 100 - (heightScale(parseInt(d.確定病例數))) })
        .attr("text-anchor", "middle")
        .attr("transform", "translate(35,50)")
        .attr("fill", "gray")
        .attr("class", function (d, i) { if (0 < i < 12) { return "illmessage" + i; } })
        .style("opacity", "0%")
        .style("font-size", "16")
        .style("text-shadow", "0.5px 0.5px 2px #FFFFFF")
        .style("font-family","Microsoft JhengHei");

        function circleMouseOver(d, i) {  // 滑鼠懸浮事件

            d3.selectAll(".illmessage" + parseInt(d3.select(this).attr("id"))).transition()
                .style("opacity", "100%");
            console.log(d3.select(this).attr("id"))
        };
        function circleMouseOut(d, i) {// 滑鼠離開事件
            d3.selectAll(".illmessage" + parseInt(d3.select(this).attr("id"))).transition()
                .style("opacity", "0%");
        };

    
})
var x = 1;

function change() {
    if (x < 2) {//切換照片
        x++;
        document.getElementById("photo").src = "./img/location0" + x + ".jpg";
    } else {
        return x = 0;
    }
}
var y = 1;

function changeRF() {
    if (y < 4) {//切換照片
        y++;
        document.getElementById("photo2").src = "./img/reference0" + y + ".png";
    } else {
        return y = 0;
    }
}

var b = 1;

function change2() {
    if (b < 2) {//切換照片2
        b++;
        document.getElementById("photo3").src = "./img/location1" + b + ".jpg";
    } else {
        return b = 0;
    }
}
var c = 1;

function changeRF2() {
    if (c < 4) {//切換照片2
        c++;
        document.getElementById("photo4").src = "./img/reference1" + c + ".png";
    } else {
        return c = 0;
    }
}

function changetT03() {
    document.getElementById("tT_c_text01").style.opacity = "0%";
    document.getElementById("tT_c_text02").style.opacity = "0%";
    document.getElementById("tT_c_text03").style.opacity = "100%";
}
function changetT01() {
    document.getElementById("tT_c_text01").style.opacity = "100%";
    document.getElementById("tT_c_text02").style.opacity = "0%";
    document.getElementById("tT_c_text03").style.opacity = "0%";
}

function changetT02() {
    document.getElementById("tT_c_text01").style.opacity = "0%";
    document.getElementById("tT_c_text02").style.opacity = "100%";
    document.getElementById("tT_c_text03").style.opacity = "0%"
}
