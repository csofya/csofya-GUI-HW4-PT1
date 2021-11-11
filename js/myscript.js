// File: myscript.js
// GUI Assignment: HW4 Using the jQuery Plugin/UI with Dynamic Multiplication Table
//     Create a dynamic table based on an HTML form using JavaScript
// Sofya Chow, Sofya_Chow@student.uml.edu
// Last Updated On: Nov 5, 2021       

$(document).ready(function () {
    // Added new rules to check if upper bound is less than lower bound
    $.validator.addMethod("checklowerhor",
        function (value, element) {
            // parseFloat converts string to number
            var upper_hor = parseFloat(value)
            var lower_hor = parseFloat($('#lower_horizontal').val())
            return (upper_hor > lower_hor) ? true : false;
        }, "The upper bound must be greater than the lower bound"
    );
    $.validator.addMethod("checklowerver",
        function (value, element) {
            var upper_ver = parseFloat(value)
            var lower_ver = parseFloat($('#lower_vertical').val())
            return (upper_ver > lower_ver) ? true : false;
        }, "The upper bound must be greater than the lower bound"
    );
    $("#form_id").validate({
        rules: {
            lower_horizontal: {
                required: true,
                // The range also validates only numbers
                range: [-50, 50]
            },
            upper_horizontal: {
                required: true,
                range: [-50, 50],
                checklowerhor: true
            },
            lower_vertical: {
                required: true,
                range: [-50, 50]
            },
            upper_vertical: {
                required: true,
                range: [-50, 50],
                checklowerver: true
            }
        },
        // Create custom messages if form catches an error
        messages: {
            lower_horizontal: {
                required: "Please enter a number"

            },
            upper_horizontal: {
                required: "Please enter a number"

            },
            lower_vertical: {
                required: "Please enter a number"

            },
            upper_vertical: {
                required: "Please enter a number"
            }
        },
        // When form is validated, proceed to create the multplication table
        submitHandler: function (form) {
            submitFunc();
        }
    });
});

// Handles form submission when the submit image is clicked
function submitFunc() {
    // Clear everything due to resubmission of form
    document.getElementById("error_message").innerHTML = "";
    document.getElementById("multiplication_table").innerHTML = "";
    document.getElementById("multiplication_table").style.visibility = "hidden";

    // Get object/values from the form
    var form = document.getElementById("form_id");
    var lower_hor = document.getElementById("lower_horizontal").value;
    var upper_hor = document.getElementById("upper_horizontal").value;
    var lower_ver = document.getElementById("lower_vertical").value;
    var upper_ver = document.getElementById("upper_vertical").value;

    createTable(+lower_hor, +upper_hor, +lower_ver, +upper_ver)

    // Since the div is orginally hidden before user input, change visibility
    document.getElementById("multiplication_table").style.visibility = "visible";
    document.getElementById("form_id").reset();

    // return statement to not refresh form
    return false;
}

// Creates a dynamic table
function createTable(lh, uh, lv, uv) {
    var table = document.getElementById("multiplication_table");
    var header_row = table.insertRow(0);
    header_row.style.backgroundColor = "lightgrey";
    var increment_var = 1;
    var increment_row = 1;

    // Extra empty cell in top left hand corner
    var new_cell = header_row.insertCell(0);
    new_cell.innerHTML = "";

    // First create the first row
    for (let i = lh; i <= uh; i++) {
        let next_cell = header_row.insertCell(increment_var);
        increment_var = increment_var + 1;
        next_cell.innerHTML = i;
    }

    var lv_index = lv;
    for (let i = lv; i <= uv; i++) {
        var header_row = table.insertRow(increment_row);
        // First, create the first cell in the remaining rows are from the vertical bounds
        var first_cell = header_row.insertCell(0);
        table.rows[increment_row].cells[0].style.backgroundColor = "lightgrey";
        first_cell.innerHTML = lv_index;
        lv_index += 1;
        increment_row += 1;
        increment_var = 1;
        // Next, fill the rest of the cells with the product of the first row and that first cell 
        // calculated in the first step
        for (let j = lh; j <= uh; j++) {
            var new_cell = header_row.insertCell(increment_var);
            new_cell.innerHTML = table.rows[0].cells[increment_var].innerHTML * first_cell.innerHTML;
            increment_var = increment_var + 1;
        }
    }
}