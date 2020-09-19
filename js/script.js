var isNotEnter = false
var weeksForYear = 48
var weeksForYearTab2 = 48
var element = $("#pdf"); // global variable
var getCanvas; // global variable
var annualProfit1 = 54780;
var annualProfit2 = 863820;
var annualSubscription1 = 4500;
var annualSubscription2 = 4500;
var monthlySFC = 375
var cashPayModelIncrementRYear =5100;
var cashPayModelAnnualRevenueCashPay = 61200;

var isSecondTabClick = false

var BASE_URL = "https://identitytoolkit.googleapis.com/v1/"
var FIREBASE_KEY ="key=AIzaSyBBGmcKvg04_155o7fs7H5qN17sHVp71yw";
var userDetails;




function Download() {
  const doc = new jsPDF();

  const specialElementHandlers = {
    '#pdf': function (element, renderer) {
      return true;
    }
  };

  const content = this.downloadPanelContent.nativeElement;

  doc.fromHTML(content.innerHTML, 0, 0, {
    'width': 100, // max width of content on PDF
    'elementHandlers': specialElementHandlers
  },
    function (bla) { doc.save('saveInCallback.pdf'); },
    0);
}



$.fn.digits = function(){ 
  return this.each(function(){ 
      $(this).text( $(this).text().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") ); 
  })
}

$( "#hearingAAC" ).keyup(function() {
  $(this).removeClass("gray-color");
  $(this).addClass("black-color");
  $("#percentage1").removeClass("gray-color");
  $("#percentage1").addClass("black-color");
  isNotEnter=true
  calculateRoiCashPayModel()
});
$( "#incrementalRFPCA" ).keyup(function() {
  
  $(this).removeClass("gray-color");
  $(this).addClass("black-color");
  isNotEnter=true
  var el= this
  el.value = '$' + el.value.replace(/[^\d]/g,'')
  calculateRoiCashPayModel()
  
});


$( "#cheeckCAW1" ).keyup(function() {
  $(this).removeClass("gray-color");
  $(this).addClass("black-color");
  isNotEnter=true
  calculateRoiCashPayModel()
});
$( "#checkCleanAAC" ).keyup(function() {
  $(this).removeClass("gray-color");
  $(this).addClass("black-color");
  $("#percentage2").removeClass("gray-color");
  $("#percentage2").addClass("black-color");
  isNotEnter=true
  calculateRoiCashPayModel()
});
$( "#incrementalRFPCA2" ).keyup(function() {
  $(this).removeClass("gray-color");
  $(this).addClass("black-color");
  isNotEnter=true
  var el= this
  el.value = '$' + el.value.replace(/[^\d]/g,'')
  calculateRoiCashPayModel()
});

$( "#weeksForYear" ).keyup(function() {
  weeksForYear = $(this).val()
  weeksForYearTab2 = weeksForYear;
  $(this).removeClass("gray-color");
  $(this).addClass("black-color");
  $( "#tab2_weeksForYear" ).val(weeksForYear);
  
  calculateRoiCashPayModel()
  if(isSecondTabClick)
    calculateRoiAsp()
});
function isEmpty(property) {
  return (property === null || property === "" || typeof property === "undefined");
}

$("#exit-button").click(function() {
  window.history.back();
  window.history.deleteAll();
 

});

$("#tab1 span, #previous-button").click(function() {
  $("#tab1 span").addClass("tab_select")
  $("#tab1 span").removeClass("tab_unselect")
  $("#tab2 span").removeClass("tab_select")
  $("#tab2 span").addClass("tab_unselect")
  $("#conversion_asp_model").hide()
  $("#cash_pay_model").show()

  $("#next-button").show()
  $("#previous-button").hide()
  $("#exit-button").hide()

  
});

$("#tab2 span, #next-button").click(function() {
  isSecondTabClick = true;
  $("#tab2 span").addClass("tab_select")
  $("#tab2 span").removeClass("tab_unselect")
  $("#tab1 span").removeClass("tab_select")
  $("#tab1 span").addClass("tab_unselect")

  $("#conversion_asp_model").show()
  $("#cash_pay_model").hide()

  $("#next-button").hide()
  $("#previous-button").show()
  $("#exit-button").show()
  

  $(".asp-model-summary .asp-model-1").hide()
  $(".asp-model-summary .asp-model-2").show()

  $(".total-financial-summary .total_financial_1").hide()
  $(".total-financial-summary .total_financial_2").show()
  $(".equal").css('visibility', 'visible');
  $(".plus").css('visibility', 'visible');
  calculateRoiAsp();
  
});

$("#next_tab").click(function() {
  $("#tab2 span").addClass("tab_select")
  $("#tab2 span").removeClass("tab_unselect")
  $("#tab1 span").removeClass("tab_select")
  $("#tab1 span").addClass("tab_unselect")

  $("#conversion_asp_model").show()
  $("#cash_pay_model").hide()
  
  $(".asp-model-summary .asp-model-1").hide()
  $(".asp-model-summary .asp-model-2").show()

  
  $(".total-financial-summary .total_financial_1").hide()
  $(".total-financial-summary .total_financial_2").show()
  $(".equal").css('visibility', 'visible');
  $(".plus").css('visibility', 'visible');
});


$( "#hearingAW" ).keyup(function() {
  $(this).removeClass("gray-color");
  $(this).addClass("black-color");

  isNotEnter=true
  var hearingAW = parseInt($("#hearingAW").val());

  var tab2Row01 = parseInt($("#tab2_row_0_1").val());
  if(hearingAW>=tab2Row01){
    var finalValue = hearingAW+1;
    $( "#tab2_row_0_1" ).val(finalValue)
  }

  $( "#tab2_row_0_0" ).val(hearingAW)
  
  calculateRoiCashPayModel()
  if(isSecondTabClick)
    calculateRoiAsp()
});
$( "#hearingAAC" ).keyup(function() {
  $(this).removeClass("gray-color");
  $(this).addClass("black-color");
  $("#percentage1").removeClass("gray-color");
  $("#percentage1").addClass("black-color");
  isNotEnter=true
  calculateRoiCashPayModel()
});
$( "#incrementalRFPCA" ).keyup(function() {
  
  $(this).removeClass("gray-color");
  $(this).addClass("black-color");
  isNotEnter=true
  var el= this
  el.value = '$' + el.value.replace(/[^\d]/g,'')
  calculateRoiCashPayModel()
  

});


$("#tab2_row_0_0").keyup(function() {
  $(this).removeClass("gray-color");
  $(this).addClass("black-color");
  var currentVal = parseInt($("#tab2_row_0_0").val());

  $( "#hearingAW" ).val(currentVal);
  calculateRoiAsp()
  calculateRoiCashPayModel()
});
$( "#tab2_row_0_1" ).keyup(function() {
  $(this).removeClass("gray-color");
  $(this).addClass("black-color");
  calculateRoiAsp()
});
$( "#tab2_row_1_0" ).keyup(function() {
  $(this).removeClass("gray-color");
  $(this).addClass("black-color");
  $("#percentage1_tab2").removeClass("gray-color");
  $("#percentage1_tab2").addClass("black-color");
  calculateRoiAsp()
});
$( "#tab2_row_1_1" ).keyup(function() {
  $(this).removeClass("gray-color");
  $(this).addClass("black-color");
  $("#percentage2_tab2").removeClass("gray-color");
  $("#percentage2_tab2").addClass("black-color");
  calculateRoiAsp()
});


$( "#tab2_row_3_0" ).keyup(function() {
  $(this).removeClass("gray-color");
  $(this).addClass("black-color");
  var el= this
  el.value = '$' + el.value.replace(/[^\d]/g,'')
  calculateRoiAsp()
});
$( "#tab2_row_3_1" ).keyup(function() {
  $(this).removeClass("gray-color");
  $(this).addClass("black-color");
  var el= this
  el.value = '$' + el.value.replace(/[^\d]/g,'')
  calculateRoiAsp()
});

$( "#tab2_weeksForYear" ).keyup(function() {
  weeksForYearTab2 = $(this).val()
  weeksForYear = weeksForYearTab2;
  $(this).removeClass("gray-color");
  $(this).addClass("black-color");
  $( "#weeksForYear" ).val(weeksForYearTab2);

  calculateRoiAsp()
  calculateRoiCashPayModel();
});
function calculateRoiCashPayModel(){
  
  var hearingAW = $("#hearingAW").val()
  var hearingAAC = $("#hearingAAC").val()
  var incrementalRFPCA = $("#incrementalRFPCA").val().replace(/[^\d]/g,'')


  var cheeckCAW1 = $("#cheeckCAW1").val()
  var checkCleanAAC = $("#checkCleanAAC").val()
  var incrementalRFPCA2 = $("#incrementalRFPCA2").val().replace(/[^\d]/g,'')
  var cognivueAW = hearingAW*hearingAAC/100
  var total1=cognivueAW*incrementalRFPCA
  var caw = cheeckCAW1*checkCleanAAC/100
  var total2 = caw*incrementalRFPCA2
  var roiircw = total1+total2
  cashPayModelIncrementRYear= roiircw*weeksForYear/12

   $("#row_3_5").text("$"+Math.round(cashPayModelIncrementRYear))
   cashPayModelAnnualRevenueCashPay= roiircw*weeksForYear;
   $("#roi_total").text("$"+Math.round(cashPayModelAnnualRevenueCashPay))
   var annualProfit= cashPayModelIncrementRYear-monthlySFC;
   $("#tab2_row_3_5_2").text("$"+Math.round(annualProfit));
   var annualSubscriptionFeeforCognivue = monthlySFC*12
   var annualNetRevenueDerivedfromCScreening = cashPayModelAnnualRevenueCashPay-annualSubscriptionFeeforCognivue
   $("#tab2_roi_total_2").text("$"+Math.round(annualNetRevenueDerivedfromCScreening))

  $("#row_1_4").digits();
  $("#row_1_5").digits();

  $("#row_2_4").digits();
  $("#row_2_5").digits();
   $("#row_3_5").digits();
   $("#roi_total").digits();
   $("#tab2_row_3_5_2").digits();
   
  $("#tab2_roi_total_2").digits();

  if(isSecondTabClick){
    calculateRoiAsp();
  }
}
function calculateRoiAsp(){
  var tab2_row_0_0 = $("#tab2_row_0_0").val()
  var tab2_row_0_1 = $("#tab2_row_0_1").val()
  var tab2_row_1_0 = $("#tab2_row_1_0").val()
  var tab2_row_1_1 = $("#tab2_row_1_1").val()
  var tab2_row_3_0 = $("#tab2_row_3_0").val().replace(/[^\d]/g,'')
  var tab2_row_3_1 = $("#tab2_row_3_1").val().replace(/[^\d]/g,'')


  var cognivueAW = tab2_row_1_0*tab2_row_0_0/100
  $( "#tab2_row_2_0" ).text(cognivueAW.toFixed(1))


  var total1=cognivueAW*tab2_row_3_0
  $( "#tab2_row_4_0" ).text("$"+Math.round(total1))



  var caw = tab2_row_1_1*tab2_row_0_1/100
  $( "#tab2_row_2_1" ).text(caw.toFixed(1))

  var total2 = caw*tab2_row_3_1
  $( "#tab2_row_4_1" ).text("$"+Math.round(total2))






  var incrementRYear1= total1*weeksForYearTab2
  $("#tab2_row_5_0").text("$"+Math.round(incrementRYear1))

  
  var incrementRYear2= total2*weeksForYearTab2
  $("#tab2_row_5_1").text("$"+Math.round(incrementRYear2))

  var totalIncrementHaRevenueForYear = incrementRYear2-incrementRYear1;

  $("#tab2_row_5_2").text("$"+Math.round(totalIncrementHaRevenueForYear))

  var aspAnnualNetRevenue = totalIncrementHaRevenueForYear/12;

  $("#tab2_row_3_5").text("$"+Math.round(aspAnnualNetRevenue))

   $("#tab2_roi_total").text("$"+Math.round(totalIncrementHaRevenueForYear))

   var monthlySFC = 375
   var annualSubScription= monthlySFC*12
   var annualProfit= totalIncrementHaRevenueForYear-annualSubScription




   var grandTotalMonthlyNetRevenue = cashPayModelIncrementRYear+aspAnnualNetRevenue;
   var grandTotalMonthlyNetRevenueAfterSfc = grandTotalMonthlyNetRevenue-monthlySFC;

   var grandTotalYearlyNetRevenue = totalIncrementHaRevenueForYear+cashPayModelAnnualRevenueCashPay;

   var annualFees = 4500;

   var grandTotalYearlyNetRevenueAfterAnnualFees = grandTotalYearlyNetRevenue-annualFees;

   $("#tab2_row_3_5_2").text("$"+Math.round(grandTotalMonthlyNetRevenueAfterSfc))

   $("#tab2_roi_total_2").text("$"+Math.round(grandTotalYearlyNetRevenueAfterAnnualFees))


   var per1 =tab2_row_0_1/tab2_row_0_0-1
   $("#right_row1").text(Math.round(per1*100))

   var per2 =tab2_row_1_1/tab2_row_1_0-1
   $("#right_row2").text(Math.round(per2*100))

   var per3 =caw/cognivueAW-1
   $("#right_row3").text(Math.round(per3*100))

   var per4 =tab2_row_3_1/tab2_row_3_0-1
   $("#right_row4").text(Math.round(per4*100))

   var per5 =total2/total1-1
   $("#right_row5").text(Math.round(per5*100))



  $("#tab2_row_3_0").digits();
  $("#tab2_row_3_1").digits();

  $("#tab2_row_4_0").digits();
  $("#tab2_row_4_1").digits();
  $("#tab2_row_5_0").digits();
  $("#tab2_row_5_1").digits();
  $("#tab2_row_5_2").digits();

  $("#tab2_total_row_1").digits();
  $("#tab2_row_3_2").digits();
  $("#tab2_row_3_1").digits();
  $("#tab2_row_3_5").digits();
  $("#tab2_row_3_5_2").digits();
  $("#tab2_roi_total_2").digits();
  
  $("#tab2_roi_total").digits();


}


//Login

$('#login').click(function () {

  var emailId = $("#email_address").val();
  var password = $("#password").val()
 
  if (emailId == "") {
    alert("Please enter Email address");
    return false;
  } else if(password ==""){
    alert("Please enter Password");
  }else if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailId)){
    var formData = {email:emailId,password:password, returnSecureToken:true}; //Array 
 
    $.ajax({
        url : BASE_URL+"accounts:signInWithPassword?"+FIREBASE_KEY,
        type: "POST",
        data : formData,
        success: function(data, textStatus, jqXHR)
        {
          userDetails = data;
          var formData = {email:userDetails.email}; //Array 

          $.ajax({
            url : "http://127.0.0.1:8280/users/userByEmail",
            type: "POST",
            data : formData,
            success: function(data, textStatus, jqXHR)
            {
              var isAdmin = false;
              if(data!=null && data.length>0){
                for(let i = 0;i < data.length;i++){
                  var admin = data[i].isAdmin
                  if(admin){
                    isAdmin = true;
                  }
               }
              }else{
                console.log("......");
              }

              if(isAdmin){
                $("#practice_name").val("");
                window.location.href = 'admin.html'
             }else{
               console.log("data","data......."+data);
               $("#email_address").val("");
                 $("#password").val("")
                 var login = document.querySelector(".login");
                 login.classList.toggle("show-modal");

                 loginPopup();
             }
              // $("#practice_name").val("");
              // window.location.href = 'home.html?practiceName='+practiceName
            },
            error: function (jqXHR, textStatus, errorThrown)
            {
              var myJSON = JSON.parse(jqXHR.responseText);
              alert(myJSON.error.message);
              console.log("data","data......."+myJSON.error.message);
            }
        });
          // console.log("data","data......."+data);
          // $("#email_address").val("");
          //   $("#password").val("")
          //   var login = document.querySelector(".login");
          //   login.classList.toggle("show-modal");

          //   loginPopup();
        },
        error: function (jqXHR, textStatus, errorThrown)
        {
          var myJSON = JSON.parse(jqXHR.responseText);
          alert(myJSON.error.message);
          console.log("data","data......."+myJSON.error.message);
        }
    });


    

  }else{
    alert("You have entered an invalid email address!")
    return false;
  }
});

function loginPopup(){

  $(".practiceName").show();

  var practiceName = document.querySelector(".practiceName");

    var trigger = document.querySelector(".trigger");
    var closeButton = document.querySelector(".close-button");
    practiceName.classList.toggle("show-modal");
    function toggleModal() {
      practiceName.classList.toggle("show-modal");
    }

    function windowOnClick(event) {
        if (event.target === practiceName) {
            toggleModal();
        }
    }

    trigger.addEventListener("click", toggleModal);
    closeButton.addEventListener("click", toggleModal);
    window.addEventListener("click", windowOnClick);
}

//Audiology popup
$('#submitt').click(function () {
  var practiceName = $("#practice_name").val()
  //var state = $("#state").val()
  var state = $('#states :selected').text();
  var emailId = $("#email_id").val()

  var numberOfLocation = $("#number_of_location").val()
  
  if (practiceName == "") {
    alert("Please enter Practice name");
    return false;
  }else{
    console.log("data........."+userDetails+"......"+practiceName);
    var formData = {name:userDetails.displayName,practiceName:practiceName, email:userDetails.email}; //Array 
    $.ajax({
      url : "http://127.0.0.1:8280/users/createUser",
      type: "POST",
      data : formData,
      success: function(data, textStatus, jqXHR)
      {
        $("#practice_name").val("");
        window.location.href = 'home.html?practiceName='+practiceName
      },
      error: function (jqXHR, textStatus, errorThrown)
      {
        var myJSON = JSON.parse(jqXHR.responseText);
        alert(myJSON.error.message);
        console.log("data","data......."+myJSON.error.message);
      }
  });

   
  }
  // }else if(state == "" || state=="State"){
  //   alert("Please select a state");
  //   return false;
  // }else if(numberOfLocation == ""){
  //   alert("Please enter Number of Locations");
  //   return false;
  // }else if (emailId == "") {
  //   alert("Please enter Email");
  //   return false;
  // } else if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailId)){
  //   window.location.href = 'home.html?practiceName='+practiceName+'&state='+state+'&numberOfLocation='+numberOfLocation
  // }else{
  //   alert("You have entered an invalid email address!")
  //   return false;
  // }
});

// $('#submitt-email').click(function () {
//   var emailId = $("#email_id").val()

//   //getPreviewTest()
//   if (emailId == "") {
//     alert("Please enter Email");
//     return false;
//   }else if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailId)){
//     $(".modal").removeClass("show-modal");
//     getPreviewTest()
//   }else{
//     alert("You have entered an invalid email address!")
//     return false;
//   }
// });

// function getPreviewTest(){
//     $("#tab1 span").click();
    


//     var html1 = $( ".body").html();
//     $( "#canvas1" ).empty();
//     $("#canvas1").append(html1); 
//     $( "#previewImage #canvas1 .tab1 span" ).addClass("tab_select");
//     $( "#previewImage #canvas1 .tab2" ).remove();

//     if(isSecondTabClick){
//       //$("#tab2 span").click();
//       $("#conversion_asp_model").show()
//       $("#cash_pay_model").hide()
//       $("tab2 span").addClass("tab_select")
//     $("tab2 span").removeClass("tab_unselect")
//       //$("#tab1 span").removeClass("tab_select")
//       //$("#tab1 span").addClass("tab_unselect")
//         var html2 = $( ".body").html();
//         console.log(html2);
  
//         $( "#canvas2" ).empty();
//         $("#canvas2").append(html2); 
//         $( "#previewImage #canvas2 .tab1 span" ).addClass("tab_select");
//         $( "#previewImage #canvas2 .tab2" ).remove();
//         $( "#previewImage #canvas2 .tab1 span" ).text("ROI - Conversion & ASP Model");   
//     }
//     generatePdf();
// }

// function getPreview(){
//   $("#tab1 span").click();
//   var element = $("#pdf");  
  


//   html2canvas(element, {allowTaint : true}).then(function (canvas){
//       $( "#canvas1" ).empty();

//     $("#canvas1").append(canvas); 
//     // var dataURL = canvas.toDataURL();
//     // console.log(dataURL);
//     // var image = $("<img>", {
//     //   "src": "data:image/png;base64," + dataURL,
//     //   "width": "250px",
//     //   "height": "250px"
//     // });
    
//     // var row = $('<tr></tr>').append('<td></td>').html(image);
//     // $("#previewImage").append(canvas); 
//    if(!isSecondTabClick){
//     importPdfTest(canvas)
//    }
//   });

  
// if(isSecondTabClick){
//   $("#tab2 span").click();
//   html2canvas(element, { 
//     allowTaint : true,
//     onrendered: function(canvas) { 
//       $( "#canvas2" ).empty();

//       $("#canvas2").append(canvas); 
//       importPdfTest(canvas)
//     } 
    
//   }); 
// }


// }

// function importPdfTest(canvas){
//   var imgageData = canvas.toDataURL("image/png");
//            // Now browser starts downloading it instead of just showing it
//            //var newData = imgageData.replace(/^data:image\/png/, "data:application/octet-stream");
//            //$("#export-pdf").attr("download", "your_pic_name.png").attr("href", newData);

//            var imgData = canvas.toDataURL("image/jpeg", 1.0);

//            var pdf = new jsPDF("landscape");

//            const imgProps= pdf.getImageProperties(imgData);
//            const pdfWidth = pdf.internal.pageSize.getWidth();
//            const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
//            pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);

//           pdf.save("ROI Calculator - Cash Pay Model.pdf.pdf");
// }

// function importPdf(canvas){
//   var element = $("#previewImage");  

//    html2canvas(element, {
//     allowTaint : true,
//     backgroundColor : "white",
//     onrendered: function (canvas) {
//       //$( "#canvas1" ).empty();

//     $("#canvas1").append(element); 
//            getCanvas = canvas;
//            var imgageData = getCanvas.toDataURL("image/png");
//            // Now browser starts downloading it instead of just showing it
//            //var newData = imgageData.replace(/^data:image\/png/, "data:application/octet-stream");
//            //$("#export-pdf").attr("download", "your_pic_name.png").attr("href", newData);

//            var imgData = canvas.toDataURL("image/jpeg", 1.0);

//            var pdf = new jsPDF("landscape");

//            const imgProps= pdf.getImageProperties(imgData);
//            const pdfWidth = pdf.internal.pageSize.getWidth();
//            const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
//            pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);

//           pdf.save("ROI Calculator - Cash Pay Model.pdf.pdf");
//         }
//     });
// }

// function generatePdf(
// ) {
//   var element = $("#previewImage");  
// html2canvas(element, {
//   useCORS: true }).then(function (canvas){
//     $("#canvas1").empty();
//     $("#canvas2").empty();

//     let imgData = canvas.toDataURL();
//     console.log(imgData);
//     let imgWidth = 210,
//         pageHeight = 295,
//         imgHeight = canvas.height * imgWidth / canvas.width,
//         heightLeft = imgHeight,
//         doc = new jsPDF('p', 'mm'),
//         position = 0;
    
//     doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
//     heightLeft -= pageHeight;
    
//     while (heightLeft >= 0) {
//         position = heightLeft - imgHeight;
//         doc.addPage();
//         doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
//         heightLeft -= pageHeight;
//     }
//     doc.save("ROI Calculator - Cash Pay Model.pdf.pdf");







// });
// }

// function generatePdfTest(
//   ) {
//     var element = $("#previewImage");  
//   html2canvas(element, {
//     useCORS: true
//   }).then(function (canvas){
//     $("#canvas1").empty();
//     $("#canvas2").empty();
//     var imgageData = getCanvas.toDataURL("image/png");
//     // Now browser starts downloading it instead of just showing it
//     //var newData = imgageData.replace(/^data:image\/png/, "data:application/octet-stream");
//     //$("#export-pdf").attr("download", "your_pic_name.png").attr("href", newData);

//     var imgData = canvas.toDataURL("image/jpeg", 1.0);

//     var pdf = new jsPDF("landscape");

//     const imgProps= pdf.getImageProperties(imgData);
//     const pdfWidth = pdf.internal.pageSize.getWidth();
//     const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
//     pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);

//    pdf.save("ROI Calculator - Cash Pay Model.pdf.pdf");


//   });
//   }

