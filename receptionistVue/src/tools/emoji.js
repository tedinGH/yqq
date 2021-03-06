import store from "@/store"
let lang = null
export const faceUrlMap = {
  "d-0": "fstatic (1).png",
  "d-1": "fstatic (2).png",
  "d-2": "fstatic (3).png",
  "d-3": "fstatic (4).png",
  "d-4": "fstatic (5).png",
  "d-5": "fstatic (6).png",
  "d-6": "fstatic (7).png",
  "d-7": "fstatic (8).png",
  "d-8": "fstatic (9).png",
  "d-9": "fstatic (10).png",
  "d-10": "fstatic (11).png",
  "d-11": "fstatic (12).png",
  "d-12": "fstatic (13).png",
  "d-13": "fstatic (14).png",
  "d-14": "fstatic (15).png",
  "d-15": "fstatic (16).png",
  "d-16": "fstatic (17).png",
  "d-17": "fstatic (18).png",
  "d-18": "fstatic (19).png",
  "d-19": "fstatic (20).png",
  "d-20": "fstatic (21).png",
  "d-21": "fstatic (22).png",
  "d-22": "fstatic (23).png",
  "d-23": "fstatic (24).png",
  "d-24": "fstatic (25).png",
  "d-25": "fstatic (26).png",
  "d-26": "fstatic (27).png",
  "d-27": "fstatic (28).png",
  "d-28": "fstatic (29).png",
  "d-29": "fstatic (30).png",
  "d-30": "fstatic (31).png",
  "d-31": "fstatic (32).png",
  "d-32": "fstatic (33).png",
  "d-33": "fstatic (34).png",
  "d-34": "fstatic (35).png",
  "d-35": "fstatic (36).png",
  "d-36": "fstatic (37).png",
  "d-37": "fstatic (38).png",
  "d-38": "fstatic (39).png",
  "d-39": "fstatic (40).png",
  "d-40": "fstatic (41).png",
  "d-41": "fstatic (42).png",
  "d-42": "fstatic (43).png",
  "d-43": "fstatic (44).png",
  "d-44": "fstatic (45).png",
  "d-45": "fstatic (46).png",
  "d-46": "fstatic (47).png",
  "d-47": "fstatic (48).png",
  "d-48": "fstatic (49).png",
  "d-49": "fstatic (50).png",
  "d-50": "fstatic (51).png",
  "d-51": "fstatic (52).png",
  "d-52": "fstatic (53).png",
  "d-53": "fstatic (54).png",
  "d-54": "fstatic (55).png",
  "d-55": "fstatic (56).png",
  "d-56": "fstatic (57).png",
  "d-57": "fstatic (58).png",
  "d-58": "fstatic (59).png",
  "d-59": "fstatic (60).png",
  "d-60": "fstatic (61).png",
  "d-61": "fstatic (62).png",
  "d-62": "fstatic (63).png",
  "d-63": "fstatic (64).png",
  "d-64": "fstatic (65).png",
  "d-65": "fstatic (66).png",
  "d-66": "fstatic (67).png",
  "d-67": "fstatic (68).png",
  "d-68": "fstatic (69).png",
  "d-69": "fstatic (70).png",
  "d-70": "fstatic (71).png",
  "d-71": "fstatic (72).png",
  "d-72": "fstatic (73).png",
  "d-73": "fstatic (74).png",
  "d-74": "fstatic (75).png",
  "d-75": "fstatic (76).png",
  "d-76": "fstatic (77).png",
  "d-77": "fstatic (78).png",
  "d-78": "fstatic (79).png",
  "d-79": "fstatic (80).png",
  "d-80": "fstatic (81).png",
  "d-81": "fstatic (82).png",
  "d-82": "fstatic (83).png",
  "d-83": "fstatic (84).png",
  "d-84": "fstatic (85).png",
  "d-85": "fstatic (86).png",
  "d-86": "fstatic (87).png",
  "d-87": "fstatic (88).png",
  "d-88": "fstatic (89).png",
  "d-89": "fstatic (90).png",
  "d-90": "fstatic (91).png",
  "d-91": "fstatic (92).png",
  "d-92": "fstatic (93).png",
  "d-93": "fstatic (94).png",
  "d-94": "fstatic (95).png",
  "d-95": "fstatic (96).png",
  "d-96": "fstatic (97).png",
  "d-97": "fstatic (98).png",
  "d-98": "fstatic (99).png",
  "d-99": "fstatic (100).png",
  "d-100": "fstatic (101).png",
  "d-101": "fstatic (102).png",
  "d-102": "fstatic (103).png",
  "d-103": "fstatic (104).png",
  "d-104": "fstatic (105).png",
  "d-105": "fstatic (106).png",
  "d-106": "fstatic (107).png",
  "d-107": "fstatic (108).png",
  "d-108": "fstatic (109).png",
  "d-109": "fstatic (110).png",
  "d-110": "fstatic (111).png",
  "d-111": "fstatic (112).png",
  "d-112": "fstatic (113).png",
  "d-113": "fstatic (114).png",
  "d-114": "fstatic (115).png",
  "d-115": "fstatic (116).png",
  "d-116": "fstatic (117).png",
  "d-117": "fstatic (118).png",
  "d-118": "fstatic (119).png",
  "d-119": "fstatic (120).png",
  "d-120": "fstatic (121).png",
  "d-121": "fstatic (122).png",
  "d-122": "fstatic (123).png",
  "d-123": "fstatic (124).png",
  "d-124": "fstatic (125).png",
  "d-125": "fstatic (126).png",
  "d-126": "fstatic (127).png",
  "d-127": "fstatic (128).png",
  "d-128": "fstatic (129).png",
  "d-129": "fstatic (130).png",
  "d-130": "fstatic (131).png",
  "d-131": "fstatic (132).png",
  "d-132": "fstatic (133).png",
  "d-133": "fstatic (134).png",
  "d-134": "fstatic (135).png",
  "d-135": "fstatic (136).png",
  "d-136": "fstatic (137).png",
  "d-137": "fstatic (138).png",
  "d-138": "fstatic (139).png",
  "d-139": "fstatic (140).png",
  "d-140": "fstatic (141).png",
  "d-141": "fstatic (142).png",
  "d-142": "fstatic (143).png",
  "d-143": "fstatic (144).png",
  "d-144": "fstatic (145).png",
  "d-145": "fstatic (146).png",
  "d-146": "fstatic (147).png",
  "d-147": "fstatic (148).png",
  "d-148": "fstatic (149).png",
  "d-149": "fstatic (150).png",
}

export const face = {
  // /**
  //  * face转国际化
  //  * @param {String} faceId 
  //  */
  // faceI18n(faceId) {
  //   lang = store.state.translate
  //   return lang.emoji[faceId]
  // },
  // /**
  //  * 文字预览国际化
  //  * @param {String} content 
  //  */
  // previewI18n(content) {
  //   lang = store.state.translate
  //   var reg = /(?<=\[)[^\]]+/g
  //   let b = content.replace(reg, function (word) {
  //     let e1 = lang.emoji[word]
  //     if (e1) {
  //       return e1
  //     }
  //     return word
  //   })
  //   return b
  // },
  // /**
  //  * 文字表情转html
  //  */
  // stringToHtml(content) {
  //   let defaulturl = "static/img/emoji/"
  //   //   if(process.env.NODE_ENV=="development"){
  //   //     defaulturl="static/img/emoji/"
  //   // }
  //   let html
  //   var reg = /\[(.*?)\]/g
  //   html = content.replace(reg, function (word) {
  //     let a = word.substring(1, word.length - 1)
  //     let e1 = lang.emoji[a]
  //     if (e1) {
  //       let imgUrl = defaulturl + faceUrlMap[a]
  //       return `<img style="float:nonepointer-events: none" height="30" width="30" src="${imgUrl}" title="${e1}" data-id="${a}">`
  //     }
  //     return word
  //   })
  //   return html
  // },
  // /**
  //  * html转文字表情
  //  */
  // htmlToString(content) {
  //   let txt
  //   var reg = /<img\b.*?(?:\>|\/>)/gi
  //   let reg1 = /(?<=data-id=")[^"]+/
  //   txt = content.replace(reg, function (word) {
  //     let faceId = word.match(reg1)
  //     return '[' + faceId + ']'
  //   })
  //   return txt
  // },
    resetUrl  (str) {
    str = str.replace(/ /g, "||nbsp|");
    let reg = /((https|http|ftp|rtsp|mms)?:\/\/)?(([0-9a-z_!~*'().&=+$%-]+: )?[0-9a-z_!~*'().&=+$%-]+@)?(([0-9]{1,3}\.){3}[0-9]{1,3}|([0-9a-z_!~*'()-]+\.)*([0-9a-z][0-9a-z-]{0,61})?[0-9a-z]\.[a-z]{2,6})(:[0-9]{1,5})?((\/?)(\/?[0-9a-z_!~*^'().;?/:@&=+$,%#-]+)+)?/gi;
    str = str.replace(reg, function (a, b, c) {
      let url = a;
      if (
        !(
          url.indexOf("ftp") >= 0 ||
          url.indexOf("http") >= 0 ||
          url.indexOf("https") >= 0
        )
      ) {
        url = "https://" + a;
      }
      return '<a href="javascript:void(0);">' + a + "</a>";
    });
    str = str.replace(/\|\|nbsp\|/g, "&nbsp;");
    return str;
  }
}
