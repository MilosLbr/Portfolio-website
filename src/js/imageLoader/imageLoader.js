const importAll = (req) => {
    // import all images
    let images = {}
    
    req.keys().forEach(elem => {
    // corecting filename for each file, adapting it for later use
    
    let corectedElem = elem.replace('./','').replace('.svg','');
    
    images[corectedElem] = req(elem);
    
    });
    return images;
}
  
const images = importAll(require.context('../../images/', false, /\.svg$/));

export {
    images
}