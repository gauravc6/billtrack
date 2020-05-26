var sideBarDocked = true;
var automaticNightLight = true;
var automaticDayNightMode = true;

// Change these (4) variables as per settings page.
var format_12hr = true;
var GlobalAutomaticNightLight = true;
var GlobalAutomaticNightMode = true;
var sideBarTimeout = 3;

var isNightModeActive = false;
var isNightLightActive = false;
var dockModeTimer = sideBarTimeout;
var dockModeInterval;
var dockModeTimerRunning = false;

function SideBar_NormalDockedState(){
   $("#SideBar").clearQueue();
   $("#MainPage").clearQueue();
   $("#SideBar").stop();
   $("#MainPage").stop();
   $("#SideBar").animate({left: '-12%'}, 200, 'linear');
   $("#MainPage").animate({width: '84%', left: '13%'}, 200, 'linear');
}

function SideBar_HoverDockedState(){
   $("#SideBar").clearQueue();
   $("#MainPage").clearQueue();
   $("#SideBar").stop();
   $("#MainPage").stop();
   $("#SideBar").animate({left: '-11%'}, 200, 'linear');
   $("#MainPage").animate({width: '83%', left: '14%'}, 200, 'linear');
}

function SideBar_UnDockedModeTimer(){
   if (dockModeTimer <= 0){
      dockModeTimerRunning = false;
      dockModeTimer = sideBarTimeout;
      $("#UnDockedDisplayMode table #TR_Timer #Timer").text(dockModeTimer);
      clearInterval(dockModeInterval);
      sideBarDocked = true;
      DockSideBar();
   }
   else {
      dockModeTimer = dockModeTimer - 1;
      $("#UnDockedDisplayMode table #TR_Timer #Timer").text(dockModeTimer);
   }
}

function SideBar_NormalUnDockedState(){
   $("#SideBar").clearQueue();
   $("#MainPage").clearQueue();
   $("#SideBar").stop();
   $("#MainPage").stop();
   $("#SideBar").animate({left: '0%'}, 200, 'linear');
   $("#MainPage").animate({width: '78%', left: '19%'}, 200, 'linear');
   if (dockModeTimerRunning == false){
      dockModeTimerRunning = true;
      dockModeTimer = sideBarTimeout;
      $("#UnDockedDisplayMode table #TR_Timer #Timer").text(dockModeTimer);
      dockModeInterval = setInterval(SideBar_UnDockedModeTimer, 1000);
   }
}

function SideBar_HoverUnDockedState(){
   dockModeTimer = sideBarTimeout;
   $("#UnDockedDisplayMode table #TR_Timer #Timer").text(dockModeTimer);
   if (dockModeTimerRunning == true){
      dockModeTimerRunning = false;
      clearInterval(dockModeInterval);
   }
}

function DockSideBar(){
   $("#UnDockedDisplayMode").stop();
   $("#DockedDisplayMode").stop();
   $("#UnDockedDisplayMode").fadeOut(0);
   $("#DockedDisplayMode").fadeIn(300);
   SideBar_NormalDockedState();
}

function UnDockSideBar(){
   $("#DockedDisplayMode").stop();
   $("#UnDockedDisplayMode").stop();
   $("#DockedDisplayMode").fadeOut(0);
   $("#UnDockedDisplayMode").fadeIn(300);
   SideBar_NormalUnDockedState();
}

function DayNightMode_Refresh(){
   let dt = new Date();
   let s_hour = "";
   let s_t_hour = dt.getHours();
   let s_minute = "";
   let s_t_minute = dt.getMinutes();;
   if (s_t_hour < '10'){
      s_hour = "0" + s_t_hour;
   }
   else if (s_t_hour >= '10'){
      s_hour = s_t_hour;
   }
   if (s_t_minute < '10'){
      s_minute = "0" + s_t_minute;
   }
   else if (s_t_minute >= '10'){
      s_minute = s_t_minute;
   }
   let t_minute = dt.getMinutes();
   let cTime = s_hour + ":" + s_minute;
   if ((cTime > "08:00") && (cTime < "18:00")){
      Activate_DayMode();
   }
   else{
      Activate_NightMode();
   }
}

function NightLightMode_Refresh(){
   let dt = new Date();
   let s_hour = "";
   let s_t_hour = dt.getHours();
   let s_minute = "";
   let s_t_minute = dt.getMinutes();;
   if (s_t_hour < '10'){
      s_hour = "0" + s_t_hour;
   }
   else if (s_t_hour >= '10'){
      s_hour = s_t_hour;
   }
   if (s_t_minute < '10'){
      s_minute = "0" + s_t_minute;
   }
   else if (s_t_minute >= '10'){
      s_minute = s_t_minute;
   }
   let t_minute = dt.getMinutes();
   let cTime = s_hour + ":" + s_minute;
   if ((cTime > "08:00") && (cTime < "18:00")){
      DeActivate_NightLight();
   }
   else{
      Activate_NightLight();
   }
}

function Activate_NightMode(){
   isNightModeActive = true;
   $("#NightSwitch").hide(0);
   $("#DaySwitch").show(0);
   // Switch colors
   $("#MainBGPage").css({"color":"rgba(255, 100, 0, 1)", "background-color":"rgba(10, 0, 40, 1)"});
   $(".DockedDisplayVisibleColumnBG").css({"background-color":"rgba(50, 0, 80, 0.8)"});
   $("#MainPage").css({"color":"rgba(240, 240, 240, 1)", "background-color":"rgba(0, 20, 80, 1)"});
   $("#Bottom-navbar").css({"color":"rgba(255, 80, 100, 1)","background-color":"rgba(40, 40, 40, 1)"});
}

function Activate_DayMode(){
   isNightModeActive = false;
   $("#DaySwitch").hide(0);
   $("#NightSwitch").show(0);
   // Switch colors
   $("#MainBGPage").css({"color":"rgba(0, 0, 0, 1)", "background-color":"rgba(255, 255, 255, 1)"});
   $(".DockedDisplayVisibleColumnBG").css({"background-color":"rgba(200, 200, 200, 0.8)"});
   $("#MainPage").css({"color":"rgba(0, 0, 0, 1)", "background-color":"rgba(240, 240, 240, 1)"});
   $("#Bottom-navbar").css({"color":"rgba(255, 255, 255, 1)","background-color":"rgba(0, 0, 40, 1)"});
}

function Activate_NightLight(){
   isNightLightActive = true;
   $("#NightLightSwitch_E").hide(0);
   $("#NightLightSwitch_D").show(0);
   $("#Top-GlassLayer").css({"background-color": "rgba(255, 100, 0, 0.1)"});
}

function DeActivate_NightLight(){
   isNightLightActive = false;
   $("#NightLightSwitch_D").hide(0);
   $("#NightLightSwitch_E").show(0);
   $("#Top-GlassLayer").css({"background-color": "rgba(255, 255, 255, 0)"});
}

function UpdateDateTime(){
   let dt = new Date();
   let date = "";
   let t_date = dt.getDate();
   let month = "";
   let t_month = dt.getMonth();
   let year = dt.getFullYear();
   let weekday = "";
   let t_weekday = dt.getDay();
   // Process above here.
   if(t_date < '10'){
      date = "0" + t_date;
   }
   else if(t_date >= '10'){
      date = t_date;
   }
   if (t_month == '0'){
      month = "JANUARY";
   }
   else if (t_month == '1'){
      month = "FEBRUARY";
   }
   else if (t_month == '2'){
      month = "MARCH";
   }
   else if (t_month == '3'){
      month = "APRIL";
   }
   else if (t_month == '4'){
      month = "MAY";
   }
   else if (t_month == '5'){
      month = "JUNE";
   }
   else if (t_month == '6'){
      month = "JULY";
   }
   else if (t_month == '7'){
      month = "AUGUST";
   }
   else if (t_month == '8'){
      month = "SEPETEMBER";
   }
   else if (t_month == '9'){
      month = "OCTOBER";
   }
   else if (t_month == '10'){
      month = "NOVEMBER";
   }
   else if (t_month == '11'){
      month = "DECEMBER";
   }
   if (t_weekday == '0'){
      weekday = "SUNDAY";
   }
   else if (t_weekday == '1'){
      weekday = "MONDAY";
   }
   else if (t_weekday == '2'){
      weekday = "TUESDAY";
   }
   else if (t_weekday == '3'){
      weekday = "WEDNESDAY";
   }
   else if (t_weekday == '4'){
      weekday = "THURSDAY";
   }
   else if (t_weekday == '5'){
      weekday = "FRIDAY";
   }
   else if (t_weekday == '6'){
      weekday = "SATURDAY";
   }
   let hour = "";
   let t_hour = dt.getHours();
   let minute = "";
   let t_minute = dt.getMinutes();
   let second = ""
   let t_second = dt.getSeconds();
   let am_pm = "";
   //Checking above here.
   if (t_hour == '0'){
      if (format_12hr == true){
         hour = "12";
         am_pm = "AM";
      }
      else if (format_12hr == false){
         hour = "00";
         am_pm = "HRS"
      }
   }
   else if (t_hour == '1'){
      if (format_12hr == true){
         hour = "01";
         am_pm = "AM";
      }
      else if (format_12hr == false){
         hour = "01";
         am_pm = "HRS"
      }
   }
   else if (t_hour == '2'){
      if (format_12hr == true){
         hour = "02";
         am_pm = "AM";
      }
      else if (format_12hr == false){
         hour = "02";
         am_pm = "HRS"
      }
   }
   else if (t_hour == '3'){
      if (format_12hr == true){
         hour = "03";
         am_pm = "AM";
      }
      else if (format_12hr == false){
         hour = "03";
         am_pm = "HRS"
      }
   }
   else if (t_hour == '4'){
      if (format_12hr == true){
         hour = "04";
         am_pm = "AM";
      }
      else if (format_12hr == false){
         hour = "04";
         am_pm = "HRS"
      }
   }
   else if (t_hour == '5'){
      if (format_12hr == true){
         hour = "05";
         am_pm = "AM";
      }
      else if (format_12hr == false){
         hour = "05";
         am_pm = "HRS"
      }
   }
   else if (t_hour == '6'){
      if (format_12hr == true){
         hour = "06";
         am_pm = "AM";
      }
      else if (format_12hr == false){
         hour = "06";
         am_pm = "HRS"
      }
   }
   else if (t_hour == '7'){
      if (format_12hr == true){
         hour = "07";
         am_pm = "AM";
      }
      else if (format_12hr == false){
         hour = "07";
         am_pm = "HRS"
      }
   }
   else if (t_hour == '8'){
      if (format_12hr == true){
         hour = "08";
         am_pm = "AM";
      }
      else if (format_12hr == false){
         hour = "08";
         am_pm = "HRS"
      }
   }
   else if (t_hour == '9'){
      if (format_12hr == true){
         hour = "09";
         am_pm = "AM";
      }
      else if (format_12hr == false){
         hour = "09";
         am_pm = "HRS"
      }
   }
   else if (t_hour == '10'){
      if (format_12hr == true){
         hour = "10";
         am_pm = "AM";
      }
      else if (format_12hr == false){
         hour = "10";
         am_pm = "HRS"
      }
   }
   else if (t_hour == '11'){
      if (format_12hr == true){
         hour = "11";
         am_pm = "AM";
      }
      else if (format_12hr == false){
         hour = "11";
         am_pm = "HRS"
      }
   }
   else if (t_hour == '12'){
      if (format_12hr == true){
         hour = "12";
         am_pm = "PM";
      }
      else if (format_12hr == false){
         hour = "12";
         am_pm = "HRS"
      }
   }
   else if (t_hour == '13'){
      if (format_12hr == true){
         hour = "01";
         am_pm = "PM";
      }
      else if (format_12hr == false){
         hour = "13";
         am_pm = "HRS"
      }
   }
   else if (t_hour == '14'){
      if (format_12hr == true){
         hour = "02";
         am_pm = "PM";
      }
      else if (format_12hr == false){
         hour = "14";
         am_pm = "HRS"
      }
   }
   else if (t_hour == '15'){
      if (format_12hr == true){
         hour = "03";
         am_pm = "PM";
      }
      else if (format_12hr == false){
         hour = "15";
         am_pm = "HRS"
      }
   }
   else if (t_hour == '16'){
      if (format_12hr == true){
         hour = "04";
         am_pm = "PM";
      }
      else if (format_12hr == false){
         hour = "16";
         am_pm = "HRS"
      }
   }
   else if (t_hour == '17'){
      if (format_12hr == true){
         hour = "05";
         am_pm = "PM";
      }
      else if (format_12hr == false){
         hour = "17";
         am_pm = "HRS"
      }
   }
   else if (t_hour == '18'){
      if (format_12hr == true){
         hour = "06";
         am_pm = "PM";
      }
      else if (format_12hr == false){
         hour = "18";
         am_pm = "HRS"
      }
   }
   else if (t_hour == '19'){
      if (format_12hr == true){
         hour = "07";
         am_pm = "PM";
      }
      else if (format_12hr == false){
         hour = "19";
         am_pm = "HRS"
      }
   }
   else if (t_hour == '20'){
      if (format_12hr == true){
         hour = "08";
         am_pm = "PM";
      }
      else if (format_12hr == false){
         hour = "20";
         am_pm = "HRS"
      }
   }
   else if (t_hour == '21'){
      if (format_12hr == true){
         hour = "09";
         am_pm = "PM";
      }
      else if (format_12hr == false){
         hour = "21";
         am_pm = "HRS"
      }
   }
   else if (t_hour == '22'){
      if (format_12hr == true){
         hour = "10";
         am_pm = "PM";
      }
      else if (format_12hr == false){
         hour = "22";
         am_pm = "HRS"
      }
   }
   else if (t_hour == '23'){
      if (format_12hr == true){
         hour = "11";
         am_pm = "PM";
      }
      else if (format_12hr == false){
         hour = "23";
         am_pm = "HRS"
      }
   }
   if (t_minute < '10'){
      minute = "0" + t_minute;
   }
   else if (t_minute >= '10'){
      minute = t_minute;
   }
   if (t_second < '10'){
      second = "0" + t_second;
   }
   else if(t_second >= '10'){
      second = t_second;
   }
   // Writing time for docked display.
   $("#Hour").text(hour);
   $("#Minute").text(minute);
   $("#APM").text(am_pm);
   $("#Date").text(date);
   $("#Day").text(weekday);
   $("#Year").text(year);
   // Writing time for undocked display.
   $("#Time").text(hour + ":" + minute + ":" + second + " " + am_pm);
   $("#CompleteDate").html(weekday + "<BR />" + month + " " + date + "<BR />" + year);
}

function Automatic_StateRefresh(){
   if (automaticDayNightMode == true){
      DayNightMode_Refresh();
   }
   else if (automaticDayNightMode == false && GlobalAutomaticNightMode == true){
      if (isNightModeActive == false){
         DayNightMode_Refresh();
      }
   }
   if (automaticNightLight == true){
      NightLightMode_Refresh();
   }
   else if (automaticNightLight == false && GlobalAutomaticNightLight == true){
      if (isNightLightActive == false){
         NightLightMode_Refresh();
      }
   }
}

function RecoverSavedState(){
   let savedAutomaticNightLight = $("#data1").text();
   let savedAutomaticDayNightMode = $("#data2").text();
   let savedIsNightLightActive = $("#data3").text();
   let savedIsNightModeActive = $("#data4").text();
   if (savedAutomaticNightLight == '1'){
      automaticNightLight = true;
   }
   else if (savedAutomaticNightLight == '0'){
      automaticNightLight = false;
   }
   if (savedAutomaticDayNightMode == '1'){
      automaticDayNightMode = true;
   }
   else if (savedAutomaticDayNightMode == '0'){
      automaticDayNightMode = false;
   }
   if (savedIsNightLightActive == '1'){
      isNightLightActive = true;
   }
   else if (savedIsNightLightActive == '0'){
      isNightLightActive = false;
   }
   if (savedIsNightModeActive == '1'){
      isNightModeActive = true;
   }
   else if (savedIsNightModeActive == '0'){
      isNightModeActive = false;
   }
   if (isNightLightActive == true){
      Activate_NightLight();
   }
   else if (isNightLightActive == false){
      DeActivate_NightLight();
   }
   if (isNightModeActive == true){
      Activate_NightMode();
   }
   else if (isNightModeActive == false){
      Activate_DayMode();
   }
}

function SaveState(){
   let saveAutomaticNightLight = '0';
   let saveAutomaticDayNightMode = '0';
   let saveIsNightLightActive = '0';
   let saveIsNightModeActive = '0';
   if (automaticNightLight == true){
      saveAutomaticNightLight = '1';
   }
   else if (automaticNightLight == false){
      saveAutomaticNightLight = '0';
   }
   if (automaticDayNightMode == true){
      saveAutomaticDayNightMode = '1';
   }
   else if (automaticDayNightMode == false){
      saveAutomaticDayNightMode = '0';
   }
   if (isNightLightActive == true){
      saveIsNightLightActive = '1';
   }
   else if (isNightLightActive == false){
      saveIsNightLightActive = '0';
   }
   if (isNightModeActive == true){
      saveIsNightModeActive = '1';
   }
   else if (isNightModeActive == false){
      saveIsNightModeActive = '0';
   }
   let sendData = {data1: saveAutomaticNightLight, data2: saveAutomaticDayNightMode, data3: saveIsNightLightActive, data4: saveIsNightModeActive};
   $.ajax({
      type: 'POST',
      url: "{{url_for('save_state')}}",
      data: JSON.stringify(sendData),
      success: function(data){},
      contentType: "application/json",
      dataType: 'json'
   });
}

$(function(){
   /**Some functionality.*/
   RecoverSavedState();
   //let saveState = setInterval(SaveState, 300);
   let updateDateTime = setInterval(UpdateDateTime, 500);
   let automaticStateRefresh = setInterval(Automatic_StateRefresh, 1000);
   DayNightMode_Refresh();
   NightLightMode_Refresh();
   SaveState();

   $("#DaySwitch").on("click", function(event){
      event.preventDefault();
      automaticDayNightMode = false;
      Activate_DayMode();
   });

   $("#NightSwitch").on("click", function(event){
      event.preventDefault();
      automaticDayNightMode = false;
      Activate_NightMode();
   });

   $("#NightLightSwitch_E").on("click", function(event){
      event.preventDefault();
      automaticNightLight = false;
      Activate_NightLight();
   });

   $("#NightLightSwitch_D").on("click", function(event){
      event.preventDefault();
      automaticNightLight = false;
      DeActivate_NightLight();
   });

   $("#SideBar").hover(function(){
      if (sideBarDocked == true){
         SideBar_HoverDockedState();
      }
      else if (sideBarDocked == false){
         SideBar_HoverUnDockedState();
      }
   }, function(){
      if (sideBarDocked == true){
         SideBar_NormalDockedState();
      }
      else if (sideBarDocked == false){
         SideBar_NormalUnDockedState();
      }
   });

   $("#SideBar").mousemove(function(){
      if (sideBarDocked == true){
         SideBar_HoverDockedState();
      }
      else if (sideBarDocked == false){
         SideBar_HoverUnDockedState();
      }
   });

   $("#SideBar").on("click", function(event){
      event.preventDefault();
      if (sideBarDocked == true){
         dockModeTimer = sideBarTimeout;
         $("#UnDockedDisplayMode table #TR_Timer #Timer").text(dockModeTimer);
         sideBarDocked = false;
         UnDockSideBar();
      }
      else if (sideBarDocked == false){
         dockModeTimer = sideBarTimeout;
         $("#UnDockedDisplayMode table #TR_Timer #Timer").text(dockModeTimer);
         sideBarDocked = true;
         if (dockModeTimerRunning == true){
            dockModeTimerRunning = false;
            clearInterval(dockModeInterval);
         }
         DockSideBar();
      }
   });

   $(document).click(function(event){
      SaveState();
      if (!$(event.target).closest('#SideBar').length){
         if (sideBarDocked == false){
            dockModeTimer = sideBarTimeout;
            $("#UnDockedDisplayMode table #TR_Timer #Timer").text(dockModeTimer);
            sideBarDocked = true;
            if (dockModeTimerRunning == true){
               dockModeTimerRunning = false;
               clearInterval(dockModeInterval);
            }
            DockSideBar();
         }
      }
   });

   $("#Logo, #Name, #Home, #TR_Home #Home").click(function(event){
      event.preventDefault();
      SaveState();
      window.location.href = "{{url_for('index')}}";
   });

   $("#SideBar #DockedDisplayMode table #TR_AllBills #AllBills, #SideBar #UnDockedDisplayMode table #TR_AllBills #AllBills").click(function(event){
      event.preventDefault();
      SaveState();
      window.location.href = "{{url_for('allbills')}}";
   });

   $("#SideBar #DockedDisplayMode table #TR_AddBills #AddBills, #SideBar #UnDockedDisplayMode table #TR_AddBills #AddBills").click(function(event){
      event.preventDefault();
      SaveState();
      window.location.href = "{{url_for('addbill')}}";
   });

   $("#SideBar #UnDockedDisplayMode table #TR_Settings #Settings").click(function(event){
      event.preventDefault();
      SaveState();
      window.location.href = "{{url_for('settings')}}";
   });
});