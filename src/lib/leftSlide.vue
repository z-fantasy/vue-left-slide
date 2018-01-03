<template>
  <div class="left-delete">
    <div class="move"
         ref="leftSlide"
         :class="{'isOpen': isOpen, 'closePan': !isOpen}"
         @touchstart="_touchStart"
         @touchmove="_touchMove"
         @touchend="_touchEnd"
         :style="txtStyle">
      <slot></slot>
    </div>
    <div class="handsIcon" :style="{'width': distanceWidth + 'px'}">
      <div class="edithand" v-if="handleGray" @click.prevent="_editItem()"><span>{{handleGray}}</span></div>
      <div class="deleteIcon" v-if="handleRed" @click.prevent="_deleteItem()"><span>{{handleRed}}</span></div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'leftSlide',
    props: {
      handleGray: {
        type: String,
        default: ''
      },
      handleRed: {
        type: String,
        default: ''
      },
      index: {
        type: Number,
        default: 0
      },
      itemData: {
        type: Object,
        default () {
          return {}
        }
      },
      distanceWidth: {
        type: Number,
        default: 120
      }
    },
    data () {
      return {
        startX: 0, // touch location
        moveX: 0, // slide location
        disX: 0, // move distance
        txtStyle: '',
        // delWidth: 200,
        isOpen: false
      }
    },
    created () {
      document.addEventListener('touchstart', (e) => {
        if (!this.$el.contains(e.target)) {
          this.isOpen = false
        }
      })
    },
    watch: {
      isOpen (val) {
        if (val && ~~this.distanceWidth !== 120) {
          setTimeout(() => {
            this.$refs.leftSlide.style.left = -(~~this.distanceWidth) + 'px'
          })
        } else {
          this.$refs.leftSlide.style.left = ''
        }
      }
    },
    methods: {
      _touchStart (ev) {
        ev = ev || event
        if (ev.touches.length === 1) {
          // finger down position
          this.startX = ev.touches[0].clientX
          // console.log(this.startX)
        }
      },
      _touchMove (ev) {
        ev = ev || event
        const distWidth = ~~this.distanceWidth
        if (ev.touches.length === 1 && (this.handleGray || this.handleRed)) {
          // Every position
          this.moveX = ev.touches[0].clientX
          // Measured distance
          this.disX = this.startX - this.moveX
          if (this.disX > 0) {
            // left Slide
            if (this.disX <= (distWidth + 1) && !this.isOpen) {
              this.txtStyle = `left:${-this.disX}px`
            } else {
              setTimeout(() => {
                this.txtStyle = `left:${-distWidth}px`
              })
            }
          } else {
            // right slide
            if (this.disX >= -distWidth && this.isOpen) {
              this.txtStyle = `left:${-distWidth - this.disX}px`
            } else {
              this.txtStyle = `left:0px`
            }
          }

          // console.log('disX==>',this.disX)
          /** other set extend
           *  如果是向右滑动或者只是点击，不改变滑动位置
           if (this.disX < 0 || this.disX === 0) {
            // console.log('没有移动');
            this.txtStyle = 'transform:translateX(0rem)'
          } else if (this.disX > 0) {
            // 如果是向左滑动，则实时给这个根元素一个向左的偏移 - left，当偏移量到达固定值delWidth时，固定元素的偏移量为 delWidth
            this.txtStyle = 'transform:translateX(-' + this.disX / 100 + 'rem)'
            if (this.disX >= this.delWidth / 100) {
              this.txtStyle = 'transform:translateX(-' + this.delWidth / 100 + 'rem)'
            }
          }
           */
        }
      },
      _touchEnd (ev) {
        if (event.changedTouches.length === 1) {
          const slideOffset = this.startX - event.changedTouches[0].clientX
          if (slideOffset > 20 || slideOffset < -10) {
            this.txtStyle = ''
          }
          if (slideOffset > 20 && (this.handleGray || this.handleRed)) {
            // left slide
            this.isOpen = true
          } else if (slideOffset < -10 && (this.handleGray || this.handleRed)) {
            this.isOpen = false
          }
          this.startX = 0
          /** use extend
           // 手指移动结束后的水平位置
           let endX = event.changedTouches[0].clientX
           // 触摸开始与结束,手指移动的距离
           this.disX = this.startX - endX
           // 如果距离小于删除按钮的1/2，不显示删除按钮
           */
        }
      },
      _deleteItem () {
        this.$emit('deleteItem', {index: this.index, item: this.itemData})
      },
      _editItem () {
        this.$emit('editItem', {index: this.index, item: this.itemData})
      }
    }
  }
</script>

<style>
  .left-delete {
    width: 100%;
    height: 100%;
    position: relative;
    z-index: 2;
    overflow-x: hidden
  }

  .left-delete .move {
    position: relative;
    width: 100%;
    z-index: 4;
    background-color: #fff;
    transition: all 0.3s
  }

  .left-delete .handsIcon {
    position: absolute;
    top: 0;
    right: 0;
    height: 100%;
    z-index: 3;
    display: flex
  }

  .left-delete .handsIcon > div {
    flex: 1;
    color: #fff;
    display: flex;
    align-items: center;
    text-align: center;
    font-size: 16px
  }

  .left-delete .handsIcon > div > span {
    flex: 1
  }

  .left-delete .handsIcon .deleteIcon {
    background: #ff5e5d
  }

  .left-delete .handsIcon .edithand {
    background-color: #cccccc
  }

  .isOpen {
    left: -120px
  }

  .closePan {
    left: 0px
  }
</style>
