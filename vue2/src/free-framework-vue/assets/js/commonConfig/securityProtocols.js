

export default function securityProtocols(agreement) {
  return [
    {
      type: "div",
      class: "df ac mt20",
      fieldList: [
        { type: "checkbox", name: "isRead", class: "login-text1", placeholder: "我已阅读并同意", rules: {
          type: "isDeal"
        },  showLabel: false, required: true, errorMsg: "请阅读并同意《信息安全承诺书》", label: "我已阅读并同意",defaultValue:true},
        {
          type: "div",
          class: "cp readText",
          label: "《信息安全承诺书》",
          events: [
            { event: "free.getAgreement", commonDatakey: "xieyi", agreement },
            { event: "data.read.show"},
            {
              event: "free.setData",
              path: 'data.read.form',
              params: [
                { key: 'xieyi', value: '{xieyi}' },
                { key: "btnShow", value: false}
              ]
            },
          ]
        }
      ]
    },
    {
      type: "dialog",
      name: "read",
      modalAppendToBody:true,
      appendToBody:true,
      title: "信息安全承诺书",
      fieldList: [
        {
          type: "form",
          name: "form",
          fieldList: [
            {
              label: "",
              name: "xieyi",
              type: "div",
              childType: "html"
            },
          ]
        },
        {
          type: "div",
          isFooter: true,
          isShow: "{data.form.btnShow}",
          fieldList: [
            {
              type: "div",
              value: "同意",
              class:"b p20 c4 br3 df h30 w60 jc ac cp",
              events: [
                { event: "win.form.login.triggerClick"}
              ]
            },
          ],
        },
        // {
        //   type: "div",
        //   isFooter: true,
        //   fieldList: [
        //     {
        //       type: "button",
        //       text: "同意",
        //       events: [
        //         { event: "data.read.hide"}
        //       ]
        //     },
        //   ],
        // },

      ],
    }
  ]
}

