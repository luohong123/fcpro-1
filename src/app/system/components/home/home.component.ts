import {
  Component,
  OnInit,
  ViewChild
} from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import {
  TimelineOptions,
  FclistdataComponent,
  Fcmenu
} from "fccomponent";
import { FCEVENT } from "fccomponent/fc";
import { SyshomeService } from "../../services/syshome.service";
import { NzModalService } from "ng-zorro-antd";
import { GridApi, ColumnApi } from "ag-grid";
import { environment } from "../../../../environments/environment";
import { Sysmenu } from "fccore";
@Component({
  selector: "home",
  templateUrl: "./home.component.html",
  styles: [
    `.messages-notices{
      position: absolute;
      right: 10px;
      top: 15px;
    }
    .all{
      display:flex;
      justify-content:between;
      align-item:center;
      height: 110px;
      padding: 20px 0px 0px 20px;
    }
    :host ::ng-deep .first-icon>i{
      font-size:40px;
      padding-left: 21%;
    }
    .tagselect{
      position: absolute;
      right: 10px;
      top: 15px;
    }
    :host ::ng-deep .viewdetail a{
      font-size:14px;
      width:100%;
    }
    .home-list{
      width:100%;
      height:300px;
      overflow-y:hidden;
    }
    .home-list:hover{
      overflow-y:auto;
    }
    .contact li{
      height:40px;
      line-height:40px;
      border-bottom:1px solid #cccccc;
      display:flex;
      align-item:center;
      white-space:nowrap;
      overflow:hidden;
      position:relative;
      padding-left:20px;
    }
    .contact li span{
      font-size:14px;
    }
    .contact_right{
      color:#399dfb;
      margin-left:10px;
    }
    .main_contact{
      position:relative;
    }
    .contact_icon{
      z-index:999;
    }
   :host ::ng-deep .home-calendar .ant-fullcalendar-header{
      position: absolute;
      top: -54px;
      right: -15px;
    }
    :host ::ng-deep .ant-fullcalendar-header .ant-radio-group{
      display:none;
    }
    :host ::ng-deep .contact_right a{
      font-size:14px;
    }
    .chat-wrap{
      width:50px;
      height:50px;
      overflow:hidden;
      position:fixed;
      right:25px;
      bottom:30px;
    }
    :host ::ng-deep .chat-show-wrap .fc-chatbox .fc-chatouter{
      visibility:visible;
      opacity: 1;
    }
    :host ::ng-deep .ant-btn-circle{
      width: 50px;
      border-radius: 50%;
      height: 50px;
      background-color:#5c92FF;
      border:none;
      font-size:0px;
    }
    :host ::ng-deep .ant-btn-circle i{
      font-size:18px;
    }
    :host ::ng-deep .fc-chatouter{
      position: fixed;
      bottom: 90px;
      right: 60px;
      opacity: 0;
      visibility:hidden;
      transition: all 0.3s;
      -moz-transition: all 0.3s;
      -webkit-transition: all 0.3s;
      -o-transition: all 0.3s;
    }
    .main_contain{
      margin-top: -10px;
    }
    .contacticon{
      position: absolute;
      right: 0;
    }
    .contacticon:hover{
      cursor: pointer;
    }
    :host ::ng-deep .fc-title{
      padding-left: 20px;
    }
  :host ::ng-deep .fastcontent{
      padding-left: 20px;
      display: inline-block;
      padding: 5px;
  }
    :host ::ng-deep .fastcontenttext a{
    color:#333333;
    font-size:14px;
    height:40px;
    line-height:40px;
    display:inline-block;
    margin-right:20px;
  }
  :host ::ng-deep .add button{
    width:60px;
    height:28px;
    color:#5c92ff;
  }
  .system-version{
    padding-left:10px;
  }
  .system-version>div{
    width:100%;
    height:300px;
    padding-left:20px;
  }
  .add {
    display:inline-block;
  }
  .home-list-inlineblock{
    display:inline-block;
  }
  :host ::ng-deep .piechart>div{
    padding-top:40px;
  }
  .fc-chatouter{
    width:385px;
    border-radius: 6px;
    box-shadow: 0px 0px 10px #333333;
}
.fc-chattop{
    width:100%;
    height:50px;
    background-color: #5C92FF;
    padding: 0px 20px;
    line-height: 50px;
    border-radius: 6px 6px 0 0;
}
.fc-username{
   margin-left:20px;
   color:#ffffff;
   font-size:16px;
   float:left;
}
.fc-chatuser {
    float: left;
    height: 50px;
    padding-top: 9px;
}
.fc-userimg{
    float:left;
    color:#ffffff;
}
.fc-close{
    color:#ffffff;
    font-size:14px;
    float:right;
    cursor:pointer;
}
.fc-chatcontent{
    width:100%;
    height:220px;
    overflow: auto;
    background-color:white;
}
.fc-chattime{
    width:100%;
    height:50px;
    color:#666666;
    font-size:12px;
    text-align: center;
    line-height: 50px;
}
.fc-chatleft{
    position: relative;
    left: 33px;
    width: 260px;
    min-height: 40px;
    background: #f1f1f1;
    -moz-border-radius: 12px;
    -webkit-border-radius: 12px;
    border-radius: 6px;
    color: #333333;
    font-size: 14px;
    padding-left: 20px;
    line-height: 37px;
    margin-bottom:20px;
    }
.fc-chatleft:before{
    position: absolute;
    content: "";
    width: 0;
    height: 16px;
    right: 100%;
    top: 20px;
    border-top: 16px solid transparent;
    border-right: 23px solid #f1f1f1;
    }
.fc-chatinnerright{
    width:100%;
    margin-bottom:10px;
    min-height: 40px;
    line-height: 37px;
}
.fc-chatright{
    position: relative;
    width: 260px;
    height: 40px;
    background: #5c92ff;
    -moz-border-radius: 12px;
    -webkit-border-radius: 12px;
    border-radius: 6px;
    color: #ffffff;
    font-size: 14px;
    padding-left: 20px;
    line-height: 40px;
    float: right;
    margin-right: 33px;
    }
.fc-chatright:after{
    position: absolute;
    content: "";
    width: 0;
    height: 16px;
    left: 100%;
    top: 19px;
    border-top: 16px solid transparent;
    border-top: 16px solid transparent;
    border-left: 23px solid #5c92ff;
    }
.fc-chatname{
    text-align:right;
    padding-right:20px;
    color:#cccccc;
    font-size:12px;
}
.fc-chatbottom {
    width: 100%;
    height: 60px;
    background: #f1f1f1;
    border-radius: 0 0 6px 6px;
    padding:10px;
}
.fc-chatsend{
    background-color:#ffffff;
    border-radius:6px;
    width: 365px;
    height: 40px;
    padding-left:20px;
    line-height：40px;
}
.fc-chatlink{
    margin-right:13px;
    float:left;
    height: 40px;
    padding-top: 12px;
}
.fc-chattext{
    float:left;
    height:100%;
    width:260px;
    border:none;
    outline:none;
}
.fc-chattext .ant-input-wrapper{
    height:100%;
    width:240px;
}
:host ::ng-deep .fc-chatouter .ant-input {
    position: relative;
    display: inline-block;
    padding: 4px 7px;
    width: 100%;
    height:40px;
    font-size: 12px;
    line-height: 1.5;
    color: rgba(0, 0, 0, 0.65);
    background-color: #fff;
    background-image: none;
    border: 1px solid #d9d9d9;
    border-radius: 4px;
    transition: all .3s;
    border: none;
}
:host ::ng-deep .ant-input {
    height: 40px;
    outline:none;
}
.fc-chatsendbutton{
    height:18px;
    font-size:14px;
    color:#5c92ff;
    display: inline-block;
    margin-top: 10px;
    cursor: pointer;
}
:host ::ng-deep .ant-input:focus {
    box-shadow: none;
}
    `
  ]
})
export class HomeComponent implements OnInit {
  navLinkListCondition: {};
  @ViewChild("navLink_listdata") navLink_listdata: FclistdataComponent;
  currentModal_navLink: any;
  //隐藏聊天面板
  showchat: boolean = false;
  //柱状图文字
  _barLabels: string[] = [
    "哈局",
    "沈阳局",
    "北京局",
    "太原局",
    "呼和局",
    "...",
    "乌鲁木齐"
  ];
  //柱状图数据
  _barData: any[] = [
    {
      data: [73370315, 174698475, 87764250, 2250, 0, 250174, 9],
      label: "计提利息总额"
    },
    {
      data: [24823, 4310789, 790632, 23052, 668, 318150, 9],
      label: "累计已提折旧总额"
    }
  ];
  //饼状图文字
  _pieLabels: string[] = ["铁债", "国开行", "优先股"];
  //饼状图数据
  _pieData: number[] = [1692215654.69178, 293107561.643836, 933395486.794522];
  //选项卡
  _tabmain = [
    { name: '公告', disabled: false },
    { name: '消息', disabled: false },
  ]
  _tabmain2 = [
    { name: "数据统计1", disabled: false },
    { name: "数据统计2", disabled: false },
    { name: "访问量", disabled: false }
  ];
  //待办任务
  waitWork = {
    field: { FIELDCODE: "FIELDNAME" },
    data: [
      {
        FIELDNAME:
          "2018.03.26-项目元数据框架构建；项目内容尽快完成项目元数据框架构建，尽快实施上线任务完成并实施"
      }
    ]
  };
  test = [
    {
      FIELDNAME:
        "2018.03.26-项目元数据框架构建；项目内容尽快完成项目元数据框架构建，尽快实施上线任务完成并实施"
    },
    {
      FIELDNAME: "2018.03.26-元数据组件开发；项目内容尽快完成数据组件开发"
    },
    {
      FIELDNAME: "2018.03.26-开始进行元数据方法的呈现方式"
    },
    {
      FIELDNAME: "2018.03.26-项目元数据框架构建"
    },
    {
      FIELDNAME: "2018.03.26-元数据组件开发"
    },
    {
      FIELDNAME: "2018.03.26-元数据组件开发；项目内容尽快完成数据组件开发"
    }
  ];
  //时间轴
  versionTimeline: TimelineOptions = {
    fcAppid: "",
    fcLabelCode: "label",
    fcTitleCode: "title",
    fcColorCode: "color",
    fcId: "ID"
  };
  items: any;
  //待办任务状态
  _waitWorkStatus: string;
  //navLink 标签
  navLinks: any;
  firstInit: boolean = true;
  constructor(
    public mainService: SyshomeService,
    public router: Router,
    public activedRoute: ActivatedRoute,
    private _router: Router,
    private nzModal: NzModalService
  ) { }
  ngOnInit(): void {
    this.mainService.providers.appService
      .findWithQuery("SYSVERSION", { PAGENUM: 1, PAGESIZE: 6, ODER: "TS DESC" })
      .subscribe(result => {
        if (result.CODE === "0") {
          let version = (this.versionTimeline.fcValues = []);
          result.DATA.forEach(item => {
            let t = this.mainService.providers.commonService.timestampFormat(
              Number.parseInt(item.PUBLISHTIME) * 1000,
              "MM-dd"
            );
            version.push({
              label: t,
              title: environment.projectName + "发布" + item.LASTVERSION + "版",
              ID: item.ID,
              color: "normal"
            });
          });
        }
      });
    // 查询SYSNOTIFY所有元数据
    this.mainService.providers.appService.findWithQuery('SYSNOTIFY', {}).subscribe(result => {
      if (result.CODE === '0') {
        this.items = result.DATA
      }
    })
    this.initNavLink();
  }
  /**
   * YM
   *动态加载快速导航标签数据;
   */
  initNavLink() {
    this.mainService.getNavLinks().subscribe(res => {
      if (res.CODE === "0") this.navLinks = res.DATA;
      this.rebuildList_NavLink();
      this.refreshNavLink();
    });
  }
  /** YM
   * 重查询NavLink_listdata数据
   */
  rebuildList_NavLink() {
    let exitsRouters: any = [];
    this.navLinks.forEach(el => {
      exitsRouters.push(el.ROUTER);
    });
    let s = this.arrayToSqlString(exitsRouters);
    if (s) {
      this.navLinkListCondition = {
        WHERE: `ENABLE='Y' AND APPID!='null' AND APPID!='SYSCOMPONENT' AND MENUTYPE='APP' AND ROUTER!='null' AND ROUTER NOT IN (${s})`
      };
    } else {
      this.navLinkListCondition = {
        WHERE: `ENABLE='Y' AND APPID!='null' AND APPID!='SYSCOMPONENT' AND MENUTYPE='APP' AND ROUTER!='null'`
      };
    }
  }
  /** YM
   * 数组转sql批查询条件
   * @param array
   */
  arrayToSqlString(array: Array<any>) {
    let str: string = "";
    for (let i = 0; i < array.length; i++) {
      str += `'${array[i]}'`;
      if (i !== array.length - 1) {
        str += ",";
      }
    }
    return str.toString();
  }
  /** YM
   * 刷新快速导航标签
   */
  refreshNavLink() {
    this.navLinks.forEach(link => {
      this.mainService.getNavLabel(link).subscribe(res => {
        if (res.CODE === "0") link["LABEL"] = res.DATA[0].MENUNAME;
      });
    });
  }
  /** YM
   * 新增快速导航标签
   */
  addNavLinkTag(contentTpl, footerTpl) {
    if (this.navLinks.length < 8) {
      this.currentModal_navLink = this.nzModal.open({
        title: "新增快速导航标签",
        content: contentTpl,
        footer: footerTpl,
        style: { width: "50%" },
        wrapClassName: "vertical-top-modal",
        maskClosable: false,
        zIndex: 998,
        onOk: function () { },
        onCancel: function () { }
      });
      setTimeout(() => {
        let gridApi: GridApi = this.navLink_listdata._gridApi;
        let column: ColumnApi = this.navLink_listdata._gridColumnApi;
        if (column) column.autoSizeAllColumns();
      });
    } else {
      this.nzModal.info({
        title: "操作提示",
        content: "快速导航标签不能超过8个",
        zIndex: 999
      });
    }
  }
  /** YM
   * 处理新增快速导航标签——确定
   */
  handleAddNavLink_ok(ev: any, listdata: FclistdataComponent) {
    let gridApi: GridApi = this.navLink_listdata._gridApi;
    let column: ColumnApi = this.navLink_listdata._gridColumnApi;
    let selected = gridApi.getSelectedRows();
    if (selected.length === 0) {
      this.currentModal_navLink.destroy("onOk");
      this.currentModal_navLink = null;
    }
    let count = this.navLinks.length + selected.length;
    if (count <= 8) {
      let saveObjs: any = [];
      selected.forEach(el => {
        let saveObj = this.mainService.getNavDefaultObj();
        for (let key in el) {
          if (key === "PID") saveObj[key] = el[key];
          if (key === "ROUTER") saveObj[key] = el[key];
        }
        saveObj["CREATETIME"] = this.mainService.getNowTimeStamp() + "";
        saveObj["LASTMODIFY"] = this.mainService.getNowTimeStamp() + "";
        saveObj["USERID"] = this.mainService.getNowUserId();
        saveObj["CATAGORY"] = "private";
        delete saveObj["ID"];
        saveObjs.push(saveObj);
      });
      this.mainService.saveNavLinks(saveObjs);
      setTimeout(() => {
        this.initNavLink();
      });
      this.currentModal_navLink.destroy("onOk");
      this.currentModal_navLink = null;
    } else {
      this.nzModal.info({
        title: "操作提示",
        content: "快速导航标签不能超过8个",
        zIndex: 999
      });
    }
  }
  /** YM
   * 处理新增快速导航标签——取消
   */
  handleAddNavLink_cancel(ev: any) {
    this.currentModal_navLink.destroy("onCancel");
    this.currentModal_navLink = null;
  }
  /** YM
   * 快速导航标签事件
   */
  navLinkEvent(ev: FCEVENT, link) {
    switch (ev.eventName) {
      case "close":
        break;
      case "beforeClose":
        event.stopPropagation();
        event.preventDefault();
        this.nzModal.confirm({
          title: "操作提示",
          content: "是否确认删除该快速导航标签？",
          onOk: () => {
            this.mainService.deleteNavLink(link).subscribe(res => {
              if (res.CODE === "0")
                this.mainService.providers.msgService.success("删除成功");
              else this.mainService.providers.msgService.warm("删除失败");
            });
            setTimeout(() => {
              this.initNavLink();
            });
          },
          onCancel: () => { }
        });
        break;
      case "click":
        event.stopPropagation();
        event.preventDefault();
        this.navTo(link.ROUTER);
        break;
      default:
        break;
    }
  }
  /** YM
   * 新增快速导航标签弹窗列表事件
   */
  navLinkListEvent(ev: FCEVENT) {
    switch (ev.eventName) {
      case "":
        break;
    }
  }
  /**
   * 柱状图事件
   * @param event
   */
  chartbarEvent(event: FCEVENT) {
    switch (event.eventName) {
      case "hover":
        break;
      case "click":
        break;
    }
  }
  /**
   * 饼状图事件
   * @param event
   */
  chartpieEvent(event: FCEVENT) {
    switch (event.eventName) {
      case "hover":
        break;
      case "click":
        break;
    }
  }
  /**
   * 上传图片
   * @param event
   */
  fileEvent(event): any {
    switch (event.eventName) {
      case "success":
        break;
      case "failure":
        break;
    }
  }

  navTo(url: string) {
    this.mainService.layoutService.navToByMenuId(this.router, url);
  }
  /**
   * 时间轴事件
   * @param event
   */
  timelineEvent(event: FCEVENT) {
    switch (event.eventName) {
      case "selected": //选中
        this.router.navigate(["/system/sysversionDetail"], {
          queryParams: { ID: event.param.ID }
        });
        break;
    }
  }
  /**
  * 消息公告点击跳转路由事件
  * @param event 
  */
  linkevent(id) {
    let menu = this.mainService.layoutService.findMenuByRouter(this.mainService.providers.menuService.menus, 'sysannouncementDetail');
    if (menu) {
      menu['param'] = id;
      this.mainService.providers.commonService.event("selectedMenu", menu);
    } else {
      this.mainService.providers.msgService.error('sysannouncementDetail' + '不存在...');
    }
    // this.router.navigate(['/system/sysannouncementDetail'], { queryParams: { ID: id } })
  }
 
  /**
   * 聊天面板
   * @param event
   */
  chatEvent(event: FCEVENT) {
    switch (event.eventName) {
      case "send": //发布聊天记录
        break;
      case "closed": //关闭聊天面板
        this.showchat = false;
        break;
    }
  }
  /**
   * 发送聊天记录
   */
  sendChat() { }
  /**
   * 关闭聊天面板
   */
  closeChat() {
    this.showchat = false;
  }
}
