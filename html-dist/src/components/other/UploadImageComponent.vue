<template>
  <div class="upload-img">
    <div class="img-item" v-for="(item, index) in bindImgs">
      <img class="img-main" :src="item.url" @click="imageClickHandler(item, index, bindImgs)">
      <img class="img-del" src="../../assets/images/index/btn-del-img.png" @click="delCurrentImage(item, index)">
    </div>
    <div class="upload-add">
      <label>
        <input type="file" multiple v-img-upload="{data:bindImgs, cb: uploadCallback}">
        <img src="../../assets/images/index/btn-add-img.png">
      </label>
    </div>
  </div>
</template>

<script>
  import $ from 'jquery';
  import {httpGet, httpPost, setting} from '../../mytools/mytools.js';
  import { Toast } from 'mint-ui';
  export default {
    name: 'UploadImageComponent',
    props: {
      bindImgs: {
        type: Array,
        required: false,
        default:  function() {
          return []
        }
      }
    },
    data ()
    {
      return {}
    },
    directives: {
      imgUpload: {
        bind: function(el, binding, vnode, oldVnode) {
          var $el = $(el).on('change', function(e) {
            var files = e.target.files;
            var fileLength = files.length;
            for(var i = 0; i < files.length; i++){
              (function(idx) {
                var reader = new FileReader(); 
                reader.readAsDataURL(files[idx]); 
                reader.onload = function(ev){                    
                  $el.val('');
                  binding.value.cb(ev.currentTarget.result, idx, fileLength);
                }; 
              })(i);
            }
          });
        }
      }
    },
    methods: {
      // --inter 上传图片
      uploadBase64Image: function(opt, cb, cberr) {
        var url = setting.base ? '/upload-base64-image' : '/mock/upload-base64-image.json'
        httpPost(url, opt).then(cb, cberr);
      },
      uploadBase64ImageHandler: function(data) {
        if(data && data.state && data.state.code == 10200) {
          this.bindImgs.push(data.data);
        }else {
          Toast(data.state.msg);
        }
      },
      uploadCallback: function(data, idx, total) {
        var that = this;
        if(idx == 0) {
          this.$emit('startuploadingimage');
        }
        this.uploadBase64Image({
          appid: '4',
          base64File: data,
          useType: 'supplyChainFinance'
        }, function(data) {
          if(idx == total - 1) {
            that.$emit('enduploadingimage');
          }
          that.uploadBase64ImageHandler(data);
        }, function(msg) {
          if(idx == total - 1) {
            that.$emit('enduploadingimage');
          }
          Toast(msg);
        });
      },
      // 图片点击事件
      imageClickHandler: function(item, index, allImages) {
        this.$emit('uploadimageclick', {
          imageInfo: item,
          index: index,
          allImages: allImages
        });
      },
      // 删除图片
      delCurrentImage: function(item, index) {
        this.bindImgs.splice(index, 1);
      },
      // 获取已经上传的图片
      getUploadedImages: function(justImageId) {
        if(justImageId) {
          return this.bindImgs.map(function(item, idx) {
            return item.imgId;
          }).join(',');
        }else {
          return this.bindImgs;
        }
      }
    },
    mounted: function () {}
  }
</script>

<style scoped>
  .upload-img{display: block;}
  .upload-img:after{content:"";display: block;clear: both;}
  .upload-add{float: left;width: 70px;height: 70px;}
  .upload-add>label{display: block;position: relative;width: 100%;height: 100%;}
  .upload-add>label>input{position: absolute;visibility: hidden;width: 0;height: 0;}
  .upload-add>label>img{display: block;width: 100%;height: 100%;}
  /*图片项目*/
  .img-item{float: left;position: relative;width: 70px;height: 70px;margin-right: 10px;margin-bottom: 10px;border:1px solid #d4d4d4;}
  .img-main{display: block;width: 100%;height: 100%;}
  .img-del{position: absolute;top: -8px;right: -8px;width: 17px;height: 17px;}
</style>
