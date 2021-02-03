<template>
  <div class="scroller" :class="{active: isShow}">
    <div class="vscroller">
      <div class="vscroller__title">
        <div class="vscroller__year"><span v-text="titleData.year"></span>年</div>
        <div class="vscroller__date" v-html="titleData.date">4月8日周一</div>
      </div>
      <section v-show="showDate">
        <div class="vscroller__body">
          <ul :style="{ webkitTransition: '-webkit-transform ' + transitionDuration / 1000 + 's ease-out', transition: 'transform ' + transitionDuration / 1000 + 's ease-out', webkitTransform: 'translate3d(0px, ' + currentTranslatedY + 'px, 0px)', transform: 'translate3d(0px, ' + currentTranslatedY + 'px, 0px)' }" ref="ul">
            <li v-for="(item,index) in itemList" :key="item.id" :data-val="item.value" :class="item.selected ? 'vselected' : ''">
              <span :class="{active: selectedIndex-1==index}" v-html="item.name"></span>
            </li>
          </ul>
        </div>
        <div class="vscroller__footer">
          <a href="javascript:;" @click="hide()" class="cancel">取消</a>
          <a href="javascript:;" @click="dateSubmit()" class="comfirm">确定</a>
        </div>
      </section>
      <section v-show="showTime">
        <mt-picker :slots="slots" :itemHeight="40" @change="onValuesChange"></mt-picker>
        <div class="vscroller__footer">
          <a href="javascript:;" @click="hide()" class="cancel">取消</a>
          <a href="javascript:;" @click="timeSubmit()" class="comfirm">确定</a>
        </div>
      </section>
      
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { Picker } from 'mint-ui';
Vue.component(Picker.name,Picker)

export default {
  name: 'Scroller',
  data() {
    return {
      isShow:false,
      scrollerTitle: 'Scroller',
      selectedIndex: 0,
      selectedValue: 1,
      startPosY: 0,
      currentPosY: 0,
      startTime: 0,
      endTime: 0,
      lastTime: (new Date()).getTime(),
      transitionDuration: 0,
      lastPosY: 0,
      lastV: 0,
      startTranslatedY: 80,
      currentTranslatedY: 80,
      haveClicked: false,
      isMouseDown: false,
      totalHeight: 40,
      showDate:true,//显示日期
      dateData:null,
      itemList: [],
      titleData:{
        year:'',
        date:'',
        time:true,
      },
      showTime:false,//显示时间
      timeData:null,
      slots: [
        {
          flex: 1,
          values: ['00','01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23'],
          className: 'slot1',
          textAlign: 'center',
          defaultIndex: +this.toNum(new Date().getHours())
        }, {
          divider: true,
          content: ':',
          className: 'slot2'
        }, {
          flex: 1,
          values: ['00','01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31','32','33','34','35','36','37','38','39','40','41','42','43','44','45','46','47','48','49','50','51','52','53','54','55','56','57','58','59'],
          className: 'slot3',
          textAlign: 'center',
          defaultIndex: +this.toNum(new Date().getMinutes())
        }
      ]
    };
  },
  created() {
    this.itemList = this.getDateList();

  },
  computed: {
  },
  watch: {
    itemList: () => {
      if(this.itemList){
        this.totalHeight = this.itemList.length * 40;
      }
    },
  },
  methods: {
    toNum(n) {
        if(n<10){
          return '0'+n
        }
        return n;
    },
    hide(){
      this.isShow = false;
      this.showDate = false;
      this.showTime = true;
    },
    show(){
      this.isShow = true;
      this.showDate = true;
      this.showTime = false;
    },
    onValuesChange(picker, values) {
      this.timeData = values;
      /*if (values[0] > values[1]) {
        picker.setSlotValue(1, values[0]);
      }*/
    },
    //日期提交
    dateSubmit(){
      this.dateData = this.getItem();
      //console.log(this.dateData);
      this.showDate = false;
      this.showTime = true;
    },
    //时间提交
    timeSubmit(){
      //console.log(this.timeData);
      this.hide();
      var data = {
        time: this.dateData.dateTime+' '+this.timeData[0]+':'+this.timeData[1]+':00',
        text: this.dateData.dateText+'  '+this.timeData[0]+':'+this.timeData[1],
      };
      this.$emit('scrollerHandler',data);
    },

    initData() {
      if (this.itemList.length > 0) {
        this.itemList.forEach((item, index) => {
          if (item.selected === true) {
            this.selectedValue = item.value;
            this.selectedIndex = index;
            return false;
          }
          return true;
        });
        this.startTranslatedY = 80 - (this.selectedIndex * 40);
        this.currentTranslatedY = this.startTranslatedY;
      } else {
        this.itemList = [{ value: 1, name: 'Please select..', selected: true }];
      }
      this.totalHeight = this.itemList.length * 40;
    },
    bindTouchEvents() {
      const el = this.$refs.ul;
      // bind events
      el.addEventListener('touchstart', (e) => {
        this.startPosY = e.changedTouches[0].pageY;
        this.currentPosY = this.startPosY;
        this.startTime = (new Date()).getTime();
        this.startTranslatedY = this.currentTranslatedY;
        this.lastV = 0;
        // console.log('touchstart!');
      }, false);

      el.addEventListener('touchmove', (e) => {
        e.preventDefault(); // prevent default scrolling event when touch moving
        this.lastV = (e.changedTouches[0].pageY - this.lastPosY) / ((new Date()).getTime() - this.lastTime);
        this.currentPosY = e.changedTouches[0].pageY;
        this.currentTranslatedY = (this.startTranslatedY + this.currentPosY) - this.startPosY;
        this.lastPosY = this.currentPosY;
        this.lastTime = (new Date()).getTime();
      }, false);

      el.addEventListener('touchend', () => {
        this.endTime = (new Date()).getTime();
        if (Math.abs(this.currentPosY - this.startPosY) > 5 && this.endTime - this.startTime > 50) {
          const v = this.lastV;
          const s = v > 0 ? (0.5 * (v ** 2)) / 0.001 : (-0.5 * (v ** 2)) / 0.001;
          const t = Math.abs(v) / 0.001;
          let currentTranslatedY = this.currentTranslatedY;
          currentTranslatedY += s;
          const residue = currentTranslatedY % 40;
          if (Math.abs(residue) >= 20) {
            if (residue < 0) {
              currentTranslatedY += ((40 + residue) * (-1));
            } else {
              currentTranslatedY += (40 - residue);
            }
          } else {
            currentTranslatedY -= residue;
          }
          if (currentTranslatedY > 80) {
            currentTranslatedY = 80;
          } else if (currentTranslatedY < (this.totalHeight - 120) * (-1)) {
            currentTranslatedY = (this.totalHeight - 120) * (-1);
          }
          const selectedIndex = Math.abs((currentTranslatedY - 80) / (-40));
          this.transitionDuration = t;
          this.currentTranslatedY = currentTranslatedY;
          setTimeout(() => {
            this.itemList[this.selectedIndex].selected = false;
            this.selectedIndex = selectedIndex;
            this.itemList[this.selectedIndex].selected = true;
            this.selectedValue = this.itemList[this.selectedIndex].value;
            this.haveClicked = false;
            this.refashTitle();
          }, t);
        } else {
          this.haveClicked = true;
        }
        this.startPosY = 0;
        this.currentPosY = 0;
        this.startTranslatedY = 0;
        this.startTime = 0;
        this.endTime = 0;
        this.lastPosY = 0;
        this.lastV = 0;
      }, false);
    },
    bindMouseEvents() {
      const el = this.$refs.ul;
      let mouseDown = null;
      let mouseMove = null;
      let mouseUp = null;
      let mouseLeave = null;
      let mouseWheel = null;

      mouseDown = (e) => { // mouse down event
        this.isMouseDown = true;
        this.startPosY = e.pageY;
        this.currentPosY = this.startPosY;
        this.startTime = (new Date()).getTime();
        this.startTranslatedY = this.currentTranslatedY;
        el.addEventListener('mousemove', mouseMove);
        el.addEventListener('mouseup', mouseUp);
        el.addEventListener('mouseleave', mouseLeave);
        // console.log('mouseDown!');
      };
      mouseMove = (e) => { // mouse move event
        if (this.isMouseDown) {
          e.preventDefault(); // prevent default selecting event when mouse moving
          this.lastV = (e.pageY - this.lastPosY) / ((new Date()).getTime() - this.lastTime);
          this.currentPosY = e.pageY;
          this.currentTranslatedY = (this.startTranslatedY + this.currentPosY) - this.startPosY;
          this.lastPosY = this.currentPosY;
          this.lastTime = (new Date()).getTime();
          this.haveClicked = false;
          this.refashTitle();
        }
      };
      mouseUp = () => { // mouse up event
        this.endTime = (new Date()).getTime();
        if (Math.abs(this.currentPosY - this.startPosY) > 5 && this.endTime - this.startTime > 20) {
          const v = this.lastV;
          const s = v > 0 ? (0.5 * (v ** 2)) / 0.001 : (-0.5 * (v ** 2)) / 0.001;
          const t = Math.abs(v) / 0.001;
          let currentTranslatedY = this.currentTranslatedY;
          currentTranslatedY += s;
          const residue = currentTranslatedY % 40;
          if (Math.abs(residue) >= 20) {
            if (residue < 0) {
              currentTranslatedY += ((40 + residue) * (-1));
            } else {
              currentTranslatedY += (40 - residue);
            }
          } else {
            currentTranslatedY -= residue;
          }
          if (currentTranslatedY > 80) {
            currentTranslatedY = 80;
          } else if (currentTranslatedY < (this.totalHeight - 120) * (-1)) {
            currentTranslatedY = (this.totalHeight - 120) * (-1);
          }
          const selectedIndex = Math.abs((currentTranslatedY - 80) / (-40));
          this.transitionDuration = t;
          this.currentTranslatedY = currentTranslatedY;
          setTimeout(() => {
            this.itemList[this.selectedIndex].selected = false;
            this.selectedIndex = selectedIndex;
            this.itemList[this.selectedIndex].selected = true;
            this.selectedValue = this.itemList[this.selectedIndex].value;
            this.haveClicked = false;
            this.refashTitle();
          }, t);
        } else {
          this.haveClicked = true;
        }
        this.startPosY = 0;
        this.currentPosY = 0;
        this.startTranslatedY = 0;
        this.startTime = 0;
        this.endTime = 0;
        this.lastPosY = 0;
        this.lastV = 0;
        this.isMouseDown = false;
        el.removeEventListener('mousemove', mouseMove);
        el.removeEventListener('mouseup', mouseUp);
        el.removeEventListener('mouseleave', mouseLeave);
        // console.log('mouseUp!');
      };
      mouseLeave = () => { // mouse leave event
        if (this.isMouseDown) {
          mouseUp();
          // console.log('mouseLeave!');
        }
      };
      mouseWheel = (e) => { // mouse wheel event
        this.startTranslatedY = this.currentTranslatedY;
        let currentTranslatedY = this.startTranslatedY + (e.deltaY * 0.5);
        const residue = currentTranslatedY % 40;
        if (Math.abs(residue) >= 20) {
          if (residue < 0) {
            currentTranslatedY += ((40 + residue) * (-1));
          } else {
            currentTranslatedY += (40 - residue);
          }
        } else {
          currentTranslatedY -= residue;
        }
        if (currentTranslatedY > 80) {
          currentTranslatedY = 80;
        } else if (currentTranslatedY < (this.totalHeight - 120) * (-1)) {
          currentTranslatedY = (this.totalHeight - 120) * (-1);
        }
        this.transitionDuration = 0.2;
        this.currentTranslatedY = currentTranslatedY;
        const selectedIndex = Math.abs((currentTranslatedY - 80) / (-40));
        setTimeout(() => {
          this.itemList[this.selectedIndex].selected = false;
          this.selectedIndex = selectedIndex;
          this.itemList[this.selectedIndex].selected = true;
          this.selectedValue = this.itemList[this.selectedIndex].value;
          this.refashTitle();
        }, this.transitionDuration);
        this.startTranslatedY = 0;
      };
      // bind events
      el.addEventListener('mousedown', mouseDown);
      el.addEventListener('wheel', mouseWheel);
    },
    bindClickEvent() {
      const el = this.$refs.ul;
      el.querySelectorAll('li').forEach(($li, index) => {
        $li.addEventListener('click', () => {
          if (this.haveClicked) {
            const itemPositionY = $li.offsetTop;
            const currentTranslatedY = 80 - itemPositionY;
            this.transitionDuration = 0;
            this.currentTranslatedY = currentTranslatedY;
            this.itemList[this.selectedIndex].selected = false;
            this.selectedIndex = index;
            this.itemList[this.selectedIndex].selected = true;
            this.selectedValue = this.itemList[this.selectedIndex].value;
            this.haveClicked = false; 
            this.refashTitle();
          }
        });
        return true;
      });
    },
    refashTitle(){
      var item = this.getItem();
      this.titleData.year = item.y;
      this.titleData.date = item.text;
    },
    getItem(){
      var result = null;
      for(var i=0; i<this.itemList.length;i++){
          var item = this.itemList[i];
          if(item.selected == true){
            result = item;
          }
      }
      return result;
    },
    getDateList(){

      //日期转星期
      var toWeek = function(n) {
        if (n == 1) {
          return '周一'
        } else if (n == 2) {
          return '周二'
        } else if (n == 3) {
          return '周三'
        } else if (n == 4) {
          return '周四'
        } else if (n == 5) {
          return '周五'
        } else if (n == 6) {
          return '周六'
        } else if (n == 0) {
          return '周日'
        }
      }

      this.titleData.year = new Date().getFullYear();
      this.titleData.date = (new Date().getMonth()+1) + '月' + new Date().getDate() + '日' + toWeek(new Date().getDay());

      const dateList = [];

      var nowdate = Date.now();
      //获取系统前5天的时间
      var startDate = new Date(nowdate-30*24*3600*1000);
      //获取系统后5天的时间
      var endDate = new Date(nowdate);

      while (true) {
        startDate.setDate(startDate.getDate());
        if (startDate.getTime() <= endDate.getTime()) {
          var item = startDate;
          var week = toWeek(item.getDay());
          var y = item.getFullYear();
          var m = item.getMonth() < 9 ? '0' + (item.getMonth()+1) : (item.getMonth()+1);
          var mm = item.getMonth()+1;
          var d = item.getDate() < 9 ? '0' + item.getDate() : item.getDate();
          var dd = item.getDate();
          var day = mm + '月' + dd + '日';
          //var day = m + '-' + d;
          startDate.setDate(startDate.getDate() + 1);

          var dateItem = {
            y:y,
            text: day + week,
            name: day +'&emsp;&emsp;&emsp;'+ week,
            dateTime: y + '-' + m + '-' + d,
            dateText: y + '年' + mm + '月' + dd + '日',
            selected:false,
          }
          if(new Date().getDate()==dd){
            dateItem.selected = true;
          }

          dateList.push(dateItem);

        } else {
          break;
        }
      }
      return dateList
    },
  },
  mounted() {


    let supportedTouch = false;
    this.initData();
    if ('ontouchstart' in window) {
      supportedTouch = true;
    }
    if (supportedTouch) {
      this.bindTouchEvents();
    } else {
      this.bindMouseEvents();
    }
    this.bindClickEvent();
      var timeSubtract = function(t2, t1) {
      var date1 = new Date(t1);
      var date2 = new Date(t2);
      var s1 = date1.getTime(),
        s2 = date2.getTime();
      var total = (s1 - s2) / 1000;
      var day = parseInt(total / (24 * 60 * 60));
      return day;
    }
  }
};
</script>

<style>
.scroller{
  display: none;
  z-index: 10;
  position: fixed;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  background: rgba(0, 0, 0, .3);
}

.scroller.active {
  display: block;
}
.vscroller{
  position: relative;
  top: 15%;left:50%;
  width: 100%;
  max-width: 400px;
  margin-left: -200px;
  -ms-touch-action: none;
  touch-action: none;  
  background: #fff;
}

.vscroller__title {
  position: relative;
  height: .75rem;
  background: #FA9400;
}

.vscroller__year {
  position: absolute;
  left: 43px;
  top: 17px;
  font-size: 24px;
  color: #fff;
}

.vscroller__date {
  position: absolute;
  left: 43px;
  bottom: 23px;
  font-size: 35px;
  color: #fff;
}

.vscroller__body {
  height: 200px;
  overflow: hidden;
  position: relative;
}
.vscroller__body ul {
  display: block;
  margin: 0;
  padding: 0;
  position: relative;
  z-index: 3;
  transform: translate3d(0px, 0px, 0px);
}
.vscroller__body li {
  display: block;
  height: 40px;
  line-height: 40px;
  cursor: pointer;
  text-align: center;
  padding: 0 5px;
  margin: 0;
  white-space: nowrap;
  vertical-align: bottom;
  width: 100%;
  color: #C6C6C6;
  position: relative;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 20px;
  font-size: 30px;

}

.vscroller__body li.vselected {
  font-size: 35px;
  color: #5E5E5E;
}

.vscroller__body li.vselected + li {
  font-size: 25px;
  font-size: 30px;
}

.vscroller__body li > span.active {
  font-size: 25px;
  font-size: 30px;
}

.vscroller__footer {
  position: relative;
  height: 162px;
}

a.comfirm {
  display: inline-block;
  position: absolute;
  bottom: 34px;
  right: 38px;
  height: 76px;
  width: 182px;
  line-height: 76px;
  text-align: center;
  font-size: 30px;
  color: #fff;
  border: 1px solid #EFEFEF;
  border-radius: 10px;
  background: #FA9400;
  text-decoration: none;
}

a.cancel {
  display: inline-block;
  position: absolute;
  bottom: 34px;
  left: 38px;
  height: 76px;
  width: 182px;
  line-height: 76px;
  text-align: center;
  font-size: 30px;
  color: #6C6C6C;
  border: 1px solid #EFEFEF;
  border-radius: 10px;
  background: #fff;
  text-decoration: none;
}

.picker {
    width: 60%;
    margin: auto;
}

.picker-item {
    height: 40px !important;
    line-height: 40px !important;
    color: #C6C6C6;
    font-size: 24px;
}

.picker-item.picker-selected {
  
  color: #5E5E5E;

}


/*mobile*/
@media only screen and (min-width: 0px) and (max-width: 900px){
   .vscroller{
    max-width: 6rem;
    margin: auto;
    margin-left: -3rem;
  }

  .vscroller__title {
    height: 1.5rem;
  }

  .vscroller__year {
    left: .31rem;
    top: .26rem;
    font-size: .28rem;
  }

  .vscroller__date {
    left: .31rem;
    bottom: .26rem;
    font-size: .48rem;
  }

  .vscroller__body li {
    font-size: .35rem;

  }

  .vscroller__body li.vselected {
    font-size: .48rem;
  }

  .vscroller__body li.vselected + li {
    font-size: .35rem;
  }

  .vscroller__body li > span.active {
    font-size: .35rem;
  }

  .vscroller__footer {
    height: 1.4rem;
  }

  a.comfirm {
    display: inline-block;
    position: absolute;
    bottom: .31rem;
    right: .5rem;
    height: .9rem;
    width: 2.16rem;
    line-height: .9rem;
    font-size: .35rem;
    border-radius: .1rem;
  }

  a.cancel {
    bottom: .31rem;
    left: .5rem;
    height: .9rem;
    width: 2.16rem;
    line-height: .9rem;
    font-size: .35rem;
    border-radius: .1rem;
  }

}
</style>
