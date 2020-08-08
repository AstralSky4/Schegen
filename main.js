$(function() {
  
  
  // Initiation
  
  $('#course-id-input').val('');
  
  var selectedCourses = []; // stores array of JSON objects --> each has course id and array for setions
  var numCourses = 0;
  
  
  // Search 
  
  $('#add-course').click(function() {
    
    var searched = $('#course-id-input').val();
    
    console.log('searched ' + searched);
    
    if (searched.length) {
      
      $.ajax({
        url: 'get-courses.php',
        data: {
          func: 'getSections',
          query: searched
        },
        type: 'POST',
        success: function(result) {
          
          var courseSections = JSON.parse(result);          
          
          console.log('result ' + courseSections);
          
          if (courseSections[0] !== 'No results') {
            
            console.log('It\'s a go!');
            
            // Add course
            
            var courseToAdd = { 'id': searched, 'sections': courseSections };
            selectedCourses.push(courseToAdd);

            if (numCourses === 0) $('#all-courses-container').removeClass('d-none');

            numCourses++;

            var coursesHtml = '<div class="selected-course row p-2">';
            coursesHtml += '<div class="selected-course-id col-12 col-sm-6 col-md-4" id="selected-course-' + numCourses + '">Course: ' + searched + '</div>';
            coursesHtml += '<div class="input-group col-12 col-sm-6 col-md-8">';
            coursesHtml += '<select class="custom-select" id="section-for-' + numCourses + '">';
            coursesHtml += '<option selected>Any section</option>';
            
            for (var i = 0; i < courseSections.length; i++) {
              coursesHtml += '<option value="' + courseSections[i] + '">' + courseSections[i] + '</option>';
            }
              
            coursesHtml += '</select>';
            coursesHtml += '<span id="remove-course-' + numCourses + '" class="remove-course-btn pl-5">&times;</span>';
            coursesHtml += '</div></div>';

            $('#all-courses-container').append(coursesHtml);
            
          } else {
            // Error: course not found
            console.log('No results');
          }
        }
      });
      
    } else {
      // Error: input a course id
    }
    
  });


  // Remove selected course

  $('#all-courses-container').on('click', '.remove-course-btn', function() {

    $(this).parent().parent().remove();

    numCourses--;

    // Regenerate list of courses to avoid id gaps (ex. removing #3 / 5)

    if (numCourses === 0) {
      $('#all-courses-container').addClass('d-none');
      $('#all-courses-container').html('<h3 class="h3 pb-5">Selected courses</h3>');
    }

  });
  

  var counter = 1;

  // Schedule option template
  function generateSchedule(name) {
    scheduleOptionsHtml = '<div class="Option' + counter + '">';
    scheduleOptionsHtml += '<h3 class="h3 pb-5">Schedule options</h3>';
    scheduleOptionsHtml += '<div class="schedule-option row" id="">'; // Add id
    scheduleOptionsHtml += `
<div class="schedule-table col-12 col-md-6">
    <table class="table table-striped table-bordered">
        <thead class="thead-light">
            <tr>
                <th scope="col">Time</th>
                <th scope="col">M</th>
                <th scope="col">T</th>
                <th scope="col">W</th>
                <th scope="col">R</th>
                <th scope="col">F</th>
            </tr>
        </thead>
        <tbody>
            <tr><th scope="row">8:00</th><td class="MON-8"></td><td class="TUE-8"></td><td class="WED-8"></td><td class="THU-8"></td><td class="FRI-8"></td></tr>
            <tr><th scope="row">8:30</th><td class="MON-8_5"></td><td class="TUE-8_5"></td><td class="WED-8_5"></td><td class="THU-8_5"></td><td class="FRI-8_5"></td></tr>
            <tr><th scope="row">9:00</th><td class="MON-9"></td><td class="TUE-9"></td><td class="WED-9"></td><td class="THU-9"></td><td class="FRI-9"></td></tr>
            <tr><th scope="row">9:30</th><td class="MON-9_5"></td><td class="TUE-9_5"></td><td class="WED-9_5"></td><td class="THU-9_5"></td><td class="FRI-9_5"></td></tr>
            <tr><th scope="row">10:00</th><td class="MON-10"></td><td class="TUE-10"></td><td class="WED-10"></td><td class="THU-10"></td><td class="FRI-10"></td></tr>
            <tr><th scope="row">10:30</th><td class="MON-10_5"></td><td class="TUE-10_5"></td><td class="WED-10_5"></td><td class="THU-10_5"></td><td class="FRI-10_5"></td></tr>
            <tr><th scope="row">11:00</th><td class="MON-11"></td><td class="TUE-11"></td><td class="WED-11"></td><td class="THU-11"></td><td class="FRI-11"></td></tr>
            <tr><th scope="row">11:30</th><td class="MON-11_5"></td><td class="TUE-11_5"></td><td class="WED-11_5"></td><td class="THU-11_5"></td><td class="FRI-11_5"></td></tr>
            <tr><th scope="row">12:00</th><td class="MON-12"></td><td class="TUE-12"></td><td class="WED-12"></td><td class="THU-12"></td><td class="FRI-12"></td></tr>
            <tr><th scope="row">12:30</th><td class="MON-12_5"></td><td class="TUE-12_5"></td><td class="WED-12_5"></td><td class="THU-12_5"></td><td class="FRI-12_5"></td></tr>
            <tr><th scope="row">13:00</th><td class="MON-13"></td><td class="TUE-13"></td><td class="WED-13"></td><td class="THU-13"></td><td class="FRI-13"></td></tr>
            <tr><th scope="row">13:30</th><td class="MON-13_5"></td><td class="TUE-13_5"></td><td class="WED-13_5"></td><td class="THU-13_5"></td><td class="FRI-13_5"></td></tr>
            <tr><th scope="row">14:00</th><td class="MON-14"></td><td class="TUE-14"></td><td class="WED-14"></td><td class="THU-14"></td><td class="FRI-14"></td></tr>
            <tr><th scope="row">14:30</th><td class="MON-14_5"></td><td class="TUE-14_5"></td><td class="WED-14_5"></td><td class="THU-14_5"></td><td class="FRI-14_5"></td></tr>
            <tr><th scope="row">15:00</th><td class="MON-15"></td><td class="TUE-15"></td><td class="WED-15"></td><td class="THU-15"></td><td class="FRI-15"></td></tr>
            <tr><th scope="row">15:30</th><td class="MON-15_5"></td><td class="TUE-15_5"></td><td class="WED-15_5"></td><td class="THU-15_5"></td><td class="FRI-15_5"></td></tr>
            <tr><th scope="row">16:00</th><td class="MON-16"></td><td class="TUE-16"></td><td class="WED-16"></td><td class="THU-16"></td><td class="FRI-16"></td></tr>
            <tr><th scope="row">16:30</th><td class="MON-16_5"></td><td class="TUE-16_5"></td><td class="WED-16_5"></td><td class="THU-16_5"></td><td class="FRI-16_5"></td></tr>
            <tr><th scope="row">17:00</th><td class="MON-17"></td><td class="TUE-17"></td><td class="WED-17"></td><td class="THU-17"></td><td class="FRI-17"></td></tr>
            <tr><th scope="row">17:30</th><td class="MON-17_5"></td><td class="TUE-17_5"></td><td class="WED-17_5"></td><td class="THU-17_5"></td><td class="FRI-17_5"></td></tr>
        </tbody>
    </table>
</div>

<div class="option-details col-12 col-md-6">
`;
    scheduleOptionsHtml += '<h3 class="h3">Option ' + counter + '</h3><ul id="ClassList' + counter + '">'; // Add option #

    // Replace with schedule details

    scheduleOptionsHtml += '</ul></div></div>';
    
    scheduleOptionsHtml += '</div>';
    
    var OptionClass = ".Option" + counter + " ";
    
    

    $('#all-options-container').append(scheduleOptionsHtml);

    
    
    
    // TEMP
    $.ajax({
      url: 'getSchedule.php', 
      data: { person: name }, 
      type: "POST", 
      success: function(resultSchedule) {
        var schedule = resultSchedule.split(". ");

        for (var i = 0; i < schedule.length; i++) {
          var idVal = "." + schedule[i].split(":")[1];
          var colVal = schedule[i].split(":")[0];
          var rowSpan = schedule[i].split(":")[2];
          var className = schedule[i].split(":")[3];
//           console.log('className ' + colVal);
          
          $(OptionClass + idVal).css("background-color", colVal);
          $(OptionClass + idVal).attr("rowspan", rowSpan);
          
          // Deletes rows overwritten by row span
          for (var x = 1; x < rowSpan; x++) {
            var delVal = parseFloat(idVal.substr(5, idVal.length + 1).replace("_", ".")) + (x / 2);
            delVal = idVal.substr(0, 4).replace(".", "#") + "-" + delVal.toString();
            delVal = delVal.replace(".", "_").replace("#", ".");
            $(OptionClass + delVal).remove();
          }
        }

      }
    });
    
    $.ajax({
      url: 'getCourses.php', 
      data: { person: name }, 
      type: "POST", 
      async: false,
      success: function(resultCourses) {
            $("#ClassList" + counter).append(resultCourses);
        }

      });
    
    counter++;
  }
  
  generateSchedule("chris77701@hotmail.com");
  generateSchedule("tylersyme12@gmail.com");

});