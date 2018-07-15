var pres=["Washington, George", "Adams, John", "Jefferson, Thomas", "Madison, James", "Monroe, James", "Adams, John",
        "Jackson, Andrew",  "Van, Buren", "Harrison, William", "Tyler, John", "Polk, James", "Taylor, Zachary",
        "Fillmore, Millard", "Pierce, Franklin", "Buchanan, James", "Lincoln, Abraham", "Johnson, Andrew",
        "Grant, Ulysses", "Hayes, Rutherford", "Garfield, James", "Arthur, Chester", "Cleveland, Grover",
        "Harrison, Benjamin", "Cleveland, Grover", "McKinley, William", "Roosevelt, Theodore", "Taft, William",
        "Wilson, Woodrow", "Harding, Warren", "Coolidge, Calvin", "Hoover, Herbert", "Roosevelt, Franklin",
        "Truman, Harry", "Eisenhower, Dwight", "Kennedy, John", "Johnson, Lyndon", "Nixon, Richard", "Ford, Gerald",
        "Carter, Jimmy", "Reagan, Ronald", "Bush, George", "Clinton, William", "Bush, George", "Obama, Barack",
        "Trump, Donald"];

function autocomplete(inp, arr) {
    //  inp : element id for autocomplete to execute
    //  arr: array of possible autocomplete values
    var currentFocus;

    // execute a function when someone types in the text field:
    inp.addEventListener("input", function(e) {

        var a, b, val = this.value;

        //close any already open lists of autocomplete suggestions
        closeAllLists();
        if (!val) { return false;}
        currentFocus = -1;

        // create a DIV that will contain the suggestions:
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");

        // append the DIV element as a child of the autocomplete container:
        this.parentNode.appendChild(a);

        for (let i = 0; i < arr.length; i++) {
            // check if the item starts with the same letters as the text field value:
            if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
                // create a DIV element for each matching element:
                b = document.createElement("DIV");

                // make the matching letters bold:
                b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
                b.innerHTML += arr[i].substr(val.length);

                // insert an input field that will hold the current array item's value:
                b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";

                // when user clicks on suggestion item DIV:
                b.addEventListener("click", function(e) {
                    inp.value = this.getElementsByTagName("input")[0].value;
                    closeAllLists();
                });
                a.appendChild(b);
            }
        }
    });

    inp.addEventListener("keydown", function(e) {
        var x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
            // "arrow down" key pressed
            currentFocus++;
            addActive(x);
        } else if (e.keyCode == 38) {
            // "arrow up" key pressed
            currentFocus--;
            addActive(x);
        } else if (e.keyCode == 13) {
            // "enter" pressed - don't submit form, trigger click event
            e.preventDefault();
            if (currentFocus > -1) {
                if (x) x[currentFocus].click();
            }
        }
    });
    function addActive(x) {
        // function to make item X active

        if (!x) return false;

        // removing the "active" class on all items:
        removeActive(x);
        if (currentFocus >= x.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = (x.length - 1);

        // add class "autocomplete-active"
        x[currentFocus].classList.add("autocomplete-active");
    }
    function removeActive(x) {
        // helper function, removes "active" class from all autocomplete items
        for (var i = 0; i < x.length; i++) {
            x[i].classList.remove("autocomplete-active");
        }
    }
    function closeAllLists(elmnt) {
        // helper function, closes all autocomplete lists except the elmnt
        var x = document.getElementsByClassName("autocomplete-items");
        for (var i = 0; i < x.length; i++) {
            if (elmnt != x[i] && elmnt != inp) {
                x[i].parentNode.removeChild(x[i]);
            }
        }
    }

    document.addEventListener("click", function (e) {
        closeAllLists(e.target);
    });
}

autocomplete(document.getElementById("userInput"), pres);

