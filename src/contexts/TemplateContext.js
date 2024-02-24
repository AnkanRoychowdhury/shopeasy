import React, {createContext, useState, useEffect} from 'react'

export const TemplateContext = createContext();

const TemplateProvider = ({ children }) => {

    // Template state
    const [templates, setTemplates] = useState([]);

    // Fetch Template
    useEffect(()=>{
        const fetchTemplates = async () => {
            const response = await fetch('http://localhost:3001/v1/templates');
            const data = await response.json();
            setTemplates(data.data);
        };
        fetchTemplates();
    }, []);
  return (
    <TemplateContext.Provider value={{ templates }}>
      {children}
    </TemplateContext.Provider>
  )
}

export default TemplateProvider;