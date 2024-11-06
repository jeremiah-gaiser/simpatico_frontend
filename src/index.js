let element = document.querySelector('#container-01');
let config = { backgroundColor: 'white' };
let viewer = $3Dmol.createViewer( element, config );
let pdbUri = '1zz1.pdb';

jQuery.ajax( pdbUri, { 
  success: function(data) {
    let v = viewer;
    let m = viewer.getModel();
    initializeView(v, data);
    initializeResList(m)
  },
  error: function(hdr, status, err) {
    console.error( "Failed to load PDB " + pdbUri + ": " + err );
  },
});

var colorAsSnake = function(atom) {
    return atom.resi % 2 ? 'white': 'green'
};

var initializeView = function(v, data){
    v.addModel(data, "pdb" );                       /* load data */
    v.setStyle({}, {cartoon: {color: 'spectrum'}});  /* style all atoms */
    v.zoomTo();                                      /* set camera */
    v.setStyle({ cartoon: {colorfunc: colorAsSnake}});
    v.render();                                      /* render scene */
    v.zoom(1.2, 1000);                               /* slight zoom */
};

var initializeResList = function(m) {
  let element = $('#residue_list')
  let atoms = m.selectedAtoms({});

  atoms.forEach(atom => {
    console.log(atom)
  })

  console.log(element)
}

