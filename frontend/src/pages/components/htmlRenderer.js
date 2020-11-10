import React from 'react';


const HTMLRenderer = ({html}) => {return (<div className={'sun-editor-editable'} dangerouslySetInnerHTML={{__html: html}}></div>)}

export default HTMLRenderer;