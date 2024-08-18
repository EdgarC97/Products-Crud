function confirmDelete(id) {
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: "btn btn-success",
            cancelButton: "btn btn-danger"
        },
        buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            // Obtén el token de verificación del formulario
            const token = document.querySelector('input[name="__RequestVerificationToken"]').value;
            
            // Envía la solicitud de eliminación
            fetch(`/Products/Delete/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'RequestVerificationToken': token
                },
            })
            .then(response => {
                if (response.ok) {
                    swalWithBootstrapButtons.fire({
                        title: "Deleted!",
                        text: "The product has been deleted.",
                        icon: "success"
                    }).then(() => {
                        window.location.href = '/Products'; // Redirige a la lista de productos
                    });
                } else {
                    throw new Error('Something went wrong');
                }
            })
            .catch(error => {
                swalWithBootstrapButtons.fire({
                    title: "Error!",
                    text: "There was a problem deleting the product.",
                    icon: "error"
                });
            });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            swalWithBootstrapButtons.fire({
                title: "Cancelled",
                text: "Your product is safe :)",
                icon: "error"
            });
        }
    });
}