Array.matrix = function(numrows, numcols, initial){
    var arr = [];
    for (var i = 0; i < numrows; ++i){
       var columns = [];
       for (var j = 0; j < numcols; ++j){
          columns[j] = ++initial;
       }
       arr[i] = columns;
     }
     return arr;
 };
   
   
 function magicSquare(N,d,val,row,col,ofs=0) {
     if(val<=N*N){
         d[row][col]=val+ofs;
         row=row-1;
         col=col+1;
         if(val%N===0){row=row+2;col=col-1;}
         else if(col===N){col=col-N;}  
         else if(row<0){row=row+N;}
         magicSquare(N,d,val+1,row,col,ofs);
     }return d;
 }
 
 function magicTwo(N){
     var b=[],r,t=[],k=(N/2-1)/2;
     var a=[[]]
     for(var i=0;i<4;i++){
         var j=i*(N/2)*(N/2);
         t=Array.matrix(N/2,N/2,j);[]
         a[i]=magicSquare(N/2,t,1,0,parseInt(N/4),j)
     }
 
     for(i=0;i<a[0].length;i++) {
         b[i]=a[0][i].concat(a[2][i]);
     }
     for(i=0;i<a[0].length;i++) {
         b.push(a[3][i].concat(a[1][i]));
     }
     for(i=0;i<N/2;i++){
         for(var j=0;j<k;j++){
             r=b[N/2+i][j];
             b[N/2+i][j]=b[i][j];
             b[i][j]=r;
         }
     }
     for(i=0;i<N/2;i++){
         for(var j=k-1;j>0;j--){
             r=b[N/2+i][N-j];
             b[N/2+i][N-j]=b[i][N-j];
             b[i][N-j]=r;
         }
     }
     
     r=b[parseInt(N/4)][0];
     b[parseInt(N/4)][0]=b[parseInt(N/2)+parseInt(N/4)][0];
     b[parseInt(N/2)+parseInt(N/4)][0]=r;
     r=b[parseInt(N/4)][parseInt(N/4)];
     b[parseInt(N/4)][parseInt(N/4)]=b[parseInt(N/2)+parseInt(N/4)][parseInt(N/4)];
     b[parseInt(N/2)+parseInt(N/4)][parseInt(N/4)]=r;
     return b;
 }
 
 function magicfour(N,d){
     for(var i=0,temp=0;i<(N/4);i++){
         for(var j=0;j<N/4;j++){
             temp=d[N-1-i][N-1-j];
             d[N-1-i][N-1-j]=d[i][j];
             d[i][j]=temp;
         }
     }
     for(var i=N/4,temp=0;i<N/2;i++){
         for(var j=N/4;j<N/2;j++){
             temp=d[N-1-i][N-1-j];
             d[N-1-i][N-1-j]=d[i][j];
             d[i][j]=temp;
         }
     }
     for(var i=0,temp=0;i<(N/4);i++){
         for(var j=0;j<N/4;j++){
             temp=d[i][N-1-j];
             d[i][N-1-j]=d[N-1-i][j];
             d[N-1-i][j]=temp;
         }
     }
     for(var i=N/4,temp=0;i<N/2;i++){
         for(var j=N/4;j<N/2;j++){
             temp=d[N-1-i][j];
             d[N-1-i][j]=d[i][N-1-j];
             d[i][N-1-j]=temp;
         }
     }
     return d;
 }
 
 
 function output(d,n){
     var sum;
     var tmp = "<table>";
     for (var row=0 ; row < n; row++){
         tmp=tmp+" <tr><td></td>";
         for(var col=0,sum=0; col<n;col++){
             sum=sum+d[row][col];
             tmp=tmp+" <td>"+d[row][col]+"</td> ";
         }
         tmp=tmp+" <td class='sum' id='row"+row+"'>"+sum+"</td></tr> ";
     }
     for(var col=0,row=n-1,sum=0;col<n;col++,row--){
         sum=sum+d[row][col]; 
     } 
     tmp=tmp+"<tr><td class='sum' id='diag1'>"+sum+"</td>";
     for(col=0; col<n;col++){
         for (var row=0,sum=0 ; row < n; row++){
         sum=sum+d[row][col];
         }
          tmp=tmp+" <td class='sum' id='col"+col+"'>"+sum+"</td> ";
     }
     for(var col=0,row=0,sum=0;col<n;col++,row++){
         sum=sum+d[row][col]; 
     } 
     tmp=tmp+"<td class='sum' id='diag2'>"+sum+"</td></tr> </table>";
     return tmp;
 }
 
 function chooseType(n,d){
     if(n%4==0){
        return(magicfour(n,d)) 
     }
     else if(n%2==0){
        return(magicTwo(n)) 
     }
     else {
         return(magicSquare(n,d,1,0,parseInt(n/2)))
     }
 }
     
 
 function toggleNote(e) {
     e.preventDefault();
     e.stopPropagation();
     //var em = this.firstElementChild;
     //if (em) this.removeChild(em);
     var dd = this.nextElementSibling;
     if (dd.style.display == "none") {
         dd.style.display = "block";
     } else {
         dd.style.display = "none";
     }
 }
 function print_error(err) {
     return '<div id="error">' +err+ '</div>';
 }
 
 window.onload = function() {
     var Output = document.getElementById("output"),
         Entry = document.getElementById("entry"),
         Submit = document.getElementById("submit"),
         Note = document.getElementById("note");
         n=8;
         
     function onSubmitEntry(e) {
         e.preventDefault();
         n = Entry.value;
         SPN =[];
         var msg = '';
         if (n==="") msg = "&nbsp;";
         else {
             n = parseInt(n);
             if ((n<=2) || (isNaN(n)))
                 msg = print_error("Wrong entry: must be a positive integer <br>larger than 2.");
             
             else{
                 var d = Array.matrix(n,n,0);
                 d=chooseType(n,d)
                 msg = msg + output(d,n);
                 
                
              }
         }
         Output.innerHTML = msg;
     }
     Submit.addEventListener("click", onSubmitEntry, false);
     Note.firstElementChild.addEventListener("click", toggleNote, false);
 };