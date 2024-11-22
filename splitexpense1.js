let popup = document.getElementById("thiscontainer");
let groupsElement = document.getElementById('groups');
let groups = [];

function  open_group() {
   
    var grpNameInput = document.getElementById('grp-name');
    grpNameInput.focus();
    grpNameInput.setSelectionRange(0, 0);
    
    // var grpTypeInput = document.getElementById('grp-type');
    // grpTypeInput.focus();
    // grpTypeInput.setSelectionRange(0, 0);
    
    popup.classList.add("open-popup");
}
function  close_group() {
    popup.classList.remove("open-popup");
    // displayGroupDetails(name1,type1);
}
// function displayGroupDetails(name1, type1) {
//     // Create a new paragraph element
//     const groupDetails = document.createElement('p');
//     groupDetails.classList.add('group-detail');
//     // Set the text content of the paragraph element
//     groupDetails.textContent = `Group Name: ${name1}, Group Type: ${type1}`;
    
//     // Get the container element where you want to display the details
//     const container = document.getElementById('container');
    
//     // Append the paragraph element to the container
//     groupsElement.appendChild(groupDetails);
//   }

function createGroup(){
     const groupName = document.getElementById('grp-name').value;
      const groupType = document.getElementById('grp-type').value;
      if(groupName && groupType){
        const groupData = { name: groupName, type: groupType };
        groups.push(groupData);
        // const groupListItem = document.createElement('li');
        const groupLink = document.createElement('a');
        groupLink.href = `splitexpense2.html?name=${groupName}&type=${groupType} `;
        groupLink.target = '_blank';
        groupLink.textContent = `Group:  ${groupName}  -   Type: ${groupType}`;
        groupLink.className = "group-list"; // add the same CSS class as before

        groupLink.style.display = "block";

         // Create a container element to hold the group link and delete button
         const groupContainer = document.createElement('div');
         groupContainer.style.display = 'flex';
         groupContainer.style.alignItems = 'center';
         
         // Add the group link to the container
         groupContainer.appendChild(groupLink);
         
         // Create a delete button
         const deleteButton = document.createElement('span');
         deleteButton.textContent = 'Delete';
         deleteButton.className = 'delete-button';
         deleteButton.style.cursor = 'pointer';
         deleteButton.style.color = 'red';
         deleteButton.style.marginLeft = '10px';
         
         // Add event listener to delete the group
         deleteButton.addEventListener('click', function(event) {
           // Remove the group from the array
             const confirmDelete = confirm("Confirm deletion of this group?");
              
              if(confirmDelete)
              {
                const index = groups.findIndex(group => group.name === groupName && group.type === groupType);
           if (index !== -1) {
             groups.splice(index, 1);
           }
           
           // Remove the group container from the DOM
           groupContainer.remove();
              }
           
         });
         
         // Add the delete button to the container
         groupContainer.appendChild(deleteButton);
         
        
        // groupListItem.textContent = `Group: ${groupName} - Type: ${groupType}`;
        // document.getElementById('groups-list').appendChild(groupListItem);

        // Add a delete button to the group link
       


        document.getElementById('groups-list').appendChild(groupContainer);
        document.getElementById('grp-name').value = '';
        document.getElementById('grp-type').value = '';
        // document.getElementById("myp").textContent = groupName + ' ' + groupType;
        close_group();
      }
      else 
      {
        alert('Please enter the required details');
      }
     


}
  // function createGroup() {
//     // Get the input values from the form
//     const groupName = document.getElementById('grp-name').value;
//     const groupType = document.getElementById('grp-type').value;
    
//     // Call the displayGroupDetails function
//     displayGroupDetails(groupName, groupType);
    
//     // Close the pop-up form
//     close_group();
//   }

document.querySelector('.create').onclick = createGroup;


