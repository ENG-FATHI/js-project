let id="no";
// localStorage.clear();
selectData();
function manageData(){
	// document.getElementById('msg').innerHTML="";
	let name=document.getElementById('name').value;
	let author =document.getElementById('author').value;
	let no =document.getElementById('no').value;
	if(name=='', author=='', no==''){
		document.getElementById('msg').innerHTML='FADALN BUUXI';
	}else{
		console.log(id);
		if(id=='no'){
			
				const bookObj = {
					name:  name,
					author: author,
					no: no,
				}

			if(!window.localStorage.getItem('crud')){
				let dataArr = [];
				dataArr.push(bookObj);
				let stringArray = JSON.stringify(dataArr)
				window.localStorage.setItem('crud', stringArray);
				selectData();
				
			}else if(window.localStorage.getItem('crud')){
				let stringArray = window.localStorage.getItem('crud');
				let Array = JSON.parse(stringArray);
				Array.push(bookObj);

				let strigyfiedArray = JSON.stringify(Array);
				window.localStorage.setItem('crud', strigyfiedArray);
				// waxay inoo madhinaysa forms ka markan save samayno 
				document.getElementById('name').value = ""
				document.getElementById('author').value = ""
				document.getElementById('no').value = ""
				selectData();

			}
	
			document.getElementById('msg1').innerHTML='Data added';
		
			
			
		}
	}
}


function selectData(){
	let arr=getCrudData();
	if(arr != null){
		let html='';
		let sobax=1;
		for(let k=0; k < arr.length; k++){
			html=html+`<tr><td>${sobax}</td><td>${arr[k].name}</td><td>${arr[k].author}<td>${arr[k].no}<td><a href="javascript:void(0)" class="btn btn-outline-primary" onclick="editData(${k})">Edit</a>&nbsp;<a href="javascript:void(0)" onclick="deleteData(${k})"><button type="button" class="btn btn-outline-danger">Delete</button></a></td></tr>`;
			sobax++;
		}
		document.getElementById('root').innerHTML=html;
		
	}
}


function editData(rid){
	// id=rid;
	let arr = getCrudData();
	document.getElementById('hide').value=rid;
	document.getElementById('name').value= arr[rid].name;
	// document.getElementById('name').value=arr[name];
	document.getElementById('author').value=arr[rid].author;
	document.getElementById('no').value=arr[rid].no;
	selectData();
	let updatebtn = document.getElementById('save');
	updatebtn.removeAttribute("id");
	updatebtn.removeAttribute("onclick");
	updatebtn.innerText="Update";
	updatebtn.setAttribute("id","update");

document.getElementById('update').addEventListener("click", () => {
	Update();
	let savebtn = document.getElementById('update');
	savebtn.removeAttribute("id");
	savebtn.innerText="Save";
  savebtn.setAttribute("id","save");
	savebtn.setAttribute("onclick","manageData()");

  document.getElementById("hide").value ="";
	document.getElementById('name').value = "";
	document.getElementById('author').value = "";
	document.getElementById('no').value = "";
});



}


function Update() {
  let id  = document.getElementById('hide').value;
	let name = document.getElementById('name').value;
	let author = document.getElementById('author').value;
	let no = document.getElementById('no').value;
 
  let data =  JSON.parse(window.localStorage.getItem('crud'))

	data[id].name = name;
	data[id].author = author;
	data[id].no = no;
  
	let updatedData = JSON.stringify(data);
  window.localStorage.setItem('crud', updatedData); 
 	selectData();
  
 
	 document.getElementById('name').value = ""
	 document.getElementById('author').value = ""
	 document.getElementById('no').value = ""
}

function deleteData(rid){
	let arr=getCrudData();
	arr.splice(rid,1);
	setCrudData(arr);
	selectData();
}
// localStorage JASONPARSER WEEYI 
function getCrudData(){
	let arr=JSON.parse(localStorage.getItem('crud'));
	return arr;
}
//  JSON.STRINFIY JASON!!!! WEEYI
function setCrudData(arr){
	localStorage.setItem('crud',JSON.stringify(arr));
}
