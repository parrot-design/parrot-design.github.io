function dangerButton({text,name,authId,apiNum,listKey,submitKey,confirmText,params,checkedOnly,appType}){
  return {
    type: "button",
    text: text,
    authId:authId,
    name: name,
    events: [
      {
        event: "win.table.validChecked",
        minSize: 1,
      },
      {
        event: "win.table.getCheckList",
        commonDatakey: "checked",
      },
      {
        event: "free.confirm",
        text: confirmText || "是否" + text + '?',
        ok: {
          events: [
            {
              event: "win.table.getCheckList",
              commonDatakey: "checked",
            },

            {
              event: "free.ajax",
              successTip:"操作成功",
              api: {
                
                apiNum: apiNum,
                // _mockUrl:true,
                appType: appType || "rms",
                params:checkedOnly ? 
                [
                  {
                    key: submitKey,
                    value: "{checked}[0]['"+ listKey +"']",
                  },{
                    key:"",
                    value:"{data.form}"
                  },
                  ...params ? params : []
                ] :  
                [
                  {
                    key: submitKey,
                    value: "{checked}",
                    filter: {
                      type: "arrToArr",
                      key: listKey,
                    },
                  },{
                    key:"",
                    value:"{data.form}"
                  },
                  ...params ? params : []
                ],
              },
            },
            {
              event: "win.table.refresh",
            },
          ],
        },
      },
    ],
  }
}
function openDialogFormButton({text,name,authId,dialogName}){
  return {
    authId:authId,
    name:name,
    type:'button',
    size:"small",
    text:text,
    "events": [
      {
          "event":  "win.table.validChecked",
          "minSize": 1
      },
      {
        event: "win."+ dialogName +".show",
      },
      {
        "event": "free.resetData",
        "path": "win."+ dialogName +".form"
      },
    ]
  }
}
function goPageButton({text,name,authId,query,size}){
  if(size===undefined)size=0
  return {
    type: "button",
    text: text,
    name:name,
    authId:authId,
    events: [
      ...size>0 ? [{
        event: "win.table.validChecked",
        size: size,
      },
      {
        event: "win.table.getCheckList",
        commonDatakey: "checked",
      }] : [],
      {
        event: "free.goPage",
        target: "_blank",
        query: query,
      },
    ],
  }
}
function exportButton({text,name,authId}){
  return {
    type: 'button',
    name:name,
    authId:authId,
    text: text,
    events: [{
      event: 'free.appendEvent',
      eventType: "exportFile",
      tablePath: 'win.table',
    }],
  }
}
function apiButton({text,name,authId,apiNum}){
  return {
    type: "button",
    text: text,
    authId: authId,
    events: [
      {
        event: "free.ajax",
        successTip:"操作成功",
        showLoading:true,
        api: {
          apiNum: apiNum,
          appType: "rms",
        },
      },
      {
        event: "win.table.refresh",
      },
    ],
  }
}
function dialogForm({title,tablePath,dialogName,fieldList,apiNum,listKey,submitKey,checkedOnly}){
  tablePath = tablePath || 'win.table'
  return {
    type: "dialog",
    name: dialogName,
    title: title,
    fieldList: [
      {
        type:"form",
        name:"form",
        fieldList:fieldList
      },
      {
        type: "div",
        isFooter: true,
        fieldList: [
          {
            type: "button",
            class: "mr10",
            text: "确认",
            events:[
              {
                event:"win."+ dialogName +".form.valid"
              },
              {
                event: tablePath + ".getCheckInfo",
                commonDatakey: "checked",
              },
              {
                event: "free.ajax",
                successTip:"操作成功！",
                showLoading:true,
                api: {
                  apiNum: apiNum,
                  appType:"rms",
                  params: checkedOnly ? 
                    [
                      {
                        key: submitKey,
                        value: "{checked.checkedArr}[0]['"+ listKey +"']",
                      },{
                        key:"",
                        value:"{data.form}"
                      }
                    ] :  
                    [
                      {
                        key: submitKey,
                        value: "{checked.checkedArr}",
                        filter: {
                          type: "arrToArr",
                          key: listKey,
                        },
                      },{
                        key:"",
                        value:"{data.form}"
                      }
                    ],
                },
                commonDatakey: "result",
              },
              {event:"win."+ dialogName +".hide"},
              {
                event: tablePath +".refresh",
              },
            ]
          },
          {
            type: "button",
            text: "取消",
            events:[
              {event:"win."+ dialogName +".hide"},
              
            ]
          },
        ],
      },
    ],
  }
}
function getFilter({functionDefine,businessObject,mergeConfig,_mockUrl}){
  return Object.assign({
    type: "filter",
    name: "filter",
    api: {
      apiNum: 140100001,
      _mockUrl:_mockUrl,
      appType: "rms",
      params: [
        { key: "functionDefine", value: functionDefine },
        { key: "businessObject", value: businessObject },
      ],
    },
    events: [
      { event: "win.filter.getParams", commonDatakey: "filter" },
      {
        event: "win.table.load",
        params: [
          { key: "conditions", value: "{filter}", },
        ]
      },
    ],
    fieldList: []
  },mergeConfig)
}
function getTable({functionDefine,businessObject,mergeConfig,appType,apiNum,titleApiNum,_mockUrl}){
  console.log(appType,apiNum)
  return Object.assign({
    type: "table",
    name: "table",
    diyCol: true,
    api: {
      _mockUrl:_mockUrl,
      apiNum: apiNum,
      appType: appType,
      params: [
        { key: "currentPage", value: "{page.page}" },
        { key: "pageSize", value: "{page.pageSize}" },
        { key: "businessObject", value: businessObject },
        { key: "functionDefine", value: functionDefine },
        { key: "pageEnabled", value: true },
      ],
    },
    titleApi: {
      _mockUrl,
      apiNum: titleApiNum,
      appType: appType,
      params: [
        { key: "functionDefine", value: functionDefine },
        { key: "businessObject", value: businessObject },
      ],
    },
    fieldList: [
      { label: "", name: "", type: "defaultCheckbox", fixed: "left" },
    ],
    events: {
      load: [
        { event: "this.getPageInfo", commonDatakey: 'totalPage' },
        { event: "data.totalNum.setValue", value: '{totalPage.recordCount}' }
      ]
    },
  },mergeConfig)
}
function listCount(){
  return {
    type: "div",
    class: 'p-list-count',
    fieldList: [
      { type: "div", value: '已筛选出' },{ type: 'div', name: 'totalNum' },{ type: "div", value: '条信息' },
    ]
  }
}
export default {dangerButton,dialogForm,goPageButton,exportButton,getFilter,getTable,listCount,openDialogFormButton,apiButton}