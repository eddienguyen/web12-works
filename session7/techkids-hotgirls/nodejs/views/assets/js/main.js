$( ()=>{
    console.log('document full load');
    //get the modal
    var modal = document.getElementById('modal-1');
    //get the button that opens the modal
    var btn = document.getElementsByClassName('more-info')[0];
    //get the span element that closes the modal
    var span = document.getElementsByClassName('close')[0];
    //when click on the button, open the modal
    // $('#open-modal').on('click', ()=>{
    //     modal.style.display = 'block';
    // });
    //when click on span, close the modal
    span.addEventListener('click', ()=>{
        modal.style.display = 'none';
    })

    //when click on anywhere outside the modal, closes it
    document.onclick = function(event){
        console.log(event.target);

        if(event.target != modal){
            modal.style.display = 'none';
        } else if(event.target.id == 'more-info'){
            console.log('btn more-info');
            modal.style.display = 'block';
        }
        // if(event.target == modal){
        //     modal.style.display = 'none';
        // }
    }
})
