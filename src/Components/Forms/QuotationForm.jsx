import { useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import styled, { keyframes } from 'styled-components';

emailjs.init('FWhla7meyPyV00HZZ');

/* ===== ANIMACIÓN ===== */
const fadeIn = keyframes`
  from { opacity:0; transform:translateY(10px);}
  to { opacity:1; transform:translateY(0);}
`;

/* ===== LAYOUT ===== */
const Overlay = styled.div`
  position:fixed;
  inset:0;
  background:rgba(0,0,0,0.45);
  display:flex;
  justify-content:center;
  align-items:center;
  z-index:1000;
  padding:20px; `;

const Container = styled.div`
  width:100%;
  max-width:720px;
  background:white;
  border-radius:24px;
  display:flex;
  flex-direction:column;
  max-height:92vh;
  overflow:hidden;
  animation:${fadeIn} .3s ease;
`;

const Content = styled.div`
  padding:20px;
  overflow-y:auto;
  flex:1;
`;

const Footer = styled.div`
  position:sticky;
  bottom:0;
  background:white;
  padding:15px;
  border-top:1px solid #eee;
`;

/* ===== UI ===== */
const Tabs = styled.div`
  display:flex;
  gap:10px;
  overflow-x:auto;
  margin-bottom:20px;
  &::-webkit-scrollbar { display:none; }
`;

const Tab = styled.button`
  min-width:85px;
  border-radius:12px;
  border:2px solid ${p=>p.active?'#064e3b':'transparent'};
  background:${p=>p.active?'#ecfdf5':'#fff'};
  padding:6px;
  cursor:pointer;
  display:flex;
  flex-direction:column;
  align-items:center;

  img{
    width:60px;
    height:60px;
    object-fit:cover;
    border-radius:10px;
    opacity:${p=>p.active?1:0.6};
  }

  span{
    font-size:12px;
    margin-top:4px;
  }
`;

const Grid = styled.div`
  display:grid;
  grid-template-columns:1fr 1fr;
  gap:10px;

  @media(max-width:600px){
    grid-template-columns:1fr;
  }
`;

const Input = styled.input`
  padding:12px;
  border-radius:8px;
  border:1px solid #ccc;
`;

const Select = styled.select`
  padding:12px;
  border-radius:8px;
  border:1px solid #ccc;
`;

const Button = styled.button`
  width:100%;
  padding:16px;
  border:none;
  border-radius:12px;
  background:${p=>p.disabled?'#ccc':'#064e3b'};
  color:white;
  font-weight:600;
`;

/* ===== COMPONENT ===== */
export default function QuotationForm({onClose}){

  useEffect(()=>{
    document.body.style.overflow='hidden';
    return ()=> document.body.style.overflow='auto';
  },[]);

  const types=[
    {value:'vehicles', label:'Vehículos', img:process.env.PUBLIC_URL + '/Images/Logos/vehiculo.jpg'},
    {value:'home', label:'Hogar', img:process.env.PUBLIC_URL + '/Images/Logos/hogar.jpg'},
    {value:'commerce', label:'Comercio', img:process.env.PUBLIC_URL + '/Images/Logos/Empresa.jpg'},
    {value:'life', label:'Vida', img:process.env.PUBLIC_URL + '/Images/Logos/vida.jpg'},
    {value:'travel', label:'Viaje', img:process.env.PUBLIC_URL + '/Images/Logos/viaje.jpg'},
  ];

  const [form,setForm]=useState({
    insuranceType:'vehicles',

    vehicles:{
      brand:'', model:'', year:'',
      zone:'', coverage:'', location:''
    },

    home:{
      type:'', use:'', construction:'',
      area:'', security:'', coverage:'', location:''
    },

    commerce:{
      type:'', employees:'', area:'',
      security:'', coverage:'', location:''
    },

    life:{
      age:'', smoker:'', health:'',
      income:'', coverage:''
    },

    travel:{
      destinations:'', startDate:'',
      endDate:'', travelers:''
    },

    common:{
      fullName:'', email:'', phone:'', ci:''
    }
  });

  const changeType=(type)=>{
    setForm(prev=>({...prev,insuranceType:type}));
  };

  const handleChange=(e)=>{
    const {name,value}=e.target;

    if(name in form.common){
      setForm(prev=>({...prev,common:{...prev.common,[name]:value}}));
    } else {
      setForm(prev=>({
        ...prev,
        [prev.insuranceType]:{
          ...prev[prev.insuranceType],
          [name]:value
        }
      }));
    }
  };

  const isValid=()=>{
    const t=form.insuranceType;
    const d=form[t];
    const c=form.common;

    if(!c.fullName || !c.email || !c.phone) return false;

    if(t==='vehicles') return d.brand && d.year && d.coverage;
    if(t==='home') return d.type && d.area && d.coverage;
    if(t==='commerce') return d.type && d.area;
    if(t==='life') return d.age && d.coverage;
    if(t==='travel') return d.destinations && d.startDate;

    return true;
  };

  const handleSubmit=async()=>{
    if(!isValid()){
      alert('Completá los datos requeridos');
      return;
    }

    const data={
      ...form.common,
      ...form[form.insuranceType],
      type:form.insuranceType
    };

    try{
      await emailjs.send('service_qsf0m5b','template_hw7rel8',{
        from_name:data.fullName,
        from_email:data.email,
        message:JSON.stringify(data,null,2)
      });

      onClose && onClose();

    }catch{
      alert('Error al enviar');
    }
  };

  const d=form[form.insuranceType];
  const c=form.common;

  return(
    <Overlay onClick={onClose}>
      <Container onClick={e=>e.stopPropagation()}>

        <Content>

          <h2>Cotización</h2>

          <Tabs>
            {types.map(t=>(
              <Tab key={t.value}
                active={form.insuranceType===t.value}
                onClick={()=>changeType(t.value)}
              >
                <img src={t.img} alt={t.label}/>
                <span>{t.label}</span>
              </Tab>
            ))}
          </Tabs>

          {/* VEHICULOS */}
          {form.insuranceType==='vehicles' && (
            <Grid>
              <Input name="brand" value={d.brand} placeholder="Marca" onChange={handleChange}/>
              <Input name="model" value={d.model} placeholder="Modelo" onChange={handleChange}/>
              <Input name="year" value={d.year} placeholder="Año" onChange={handleChange}/>

              <Select name="zone" value={d.zone} onChange={handleChange}>
                <option value="">Zona circulación</option>
                <option>Montevideo</option>
                <option>Interior</option>
                <option>Mixto</option>
              </Select>

              <Select name="coverage" value={d.coverage} onChange={handleChange}>
                <option value="">Cobertura</option>
                <option>Responsabilidad Civil</option>
                <option>Terceros</option>
                <option>Terceros Completo</option>
                <option>Todo Riesgo</option>
              </Select>

              <Input name="location" value={d.location} placeholder="Localidad" onChange={handleChange}/>
            </Grid>
          )}

          {/* HOGAR */}
          {form.insuranceType==='home' && (
            <Grid>
              <Select name="type" value={d.type} onChange={handleChange}>
                <option value="">Tipo</option>
                <option>Casa</option>
                <option>Apartamento</option>
              </Select>

              <Select name="construction" value={d.construction} onChange={handleChange}>
                <option value="">Construcción</option>
                <option>Tradicional</option>
                <option>Liviana</option>
              </Select>

              <Input name="area" value={d.area} placeholder="m²" onChange={handleChange}/>
              <Input name="security" value={d.security} placeholder="Seguridad" onChange={handleChange}/>

              <Select name="coverage" value={d.coverage} onChange={handleChange}>
                <option value="">Cobertura</option>
                <option>Incendio</option>
                <option>Incendio + Hurto</option>
                <option>Todo Riesgo Hogar</option>
              </Select>

              <Input name="location" value={d.location} placeholder="Localidad" onChange={handleChange}/>
            </Grid>
          )}

          {/* COMERCIO */}
          {form.insuranceType==='commerce' && (
            <Grid>
              <Input name="type" value={d.type} placeholder="Rubro" onChange={handleChange}/>
              <Input name="employees" value={d.employees} placeholder="Empleados" onChange={handleChange}/>
              <Input name="area" value={d.area} placeholder="m²" onChange={handleChange}/>
              <Input name="security" value={d.security} placeholder="Seguridad" onChange={handleChange}/>

              <Select name="coverage" value={d.coverage} onChange={handleChange}>
                <option value="">Cobertura</option>
                <option>Básica</option>
                <option>Intermedia</option>
                <option>Completa</option>
              </Select>

              <Input name="location" value={d.location} placeholder="Localidad" onChange={handleChange}/>
            </Grid>
          )}

          {/* VIDA */}
          {form.insuranceType==='life' && (
            <Grid>
              <Input name="age" value={d.age} placeholder="Edad" onChange={handleChange}/>

              <Select name="smoker" value={d.smoker} onChange={handleChange}>
                <option value="">Fumador</option>
                <option>No</option>
                <option>Sí</option>
              </Select>

              <Input name="health" value={d.health} placeholder="Salud / enfermedades" onChange={handleChange}/>
              <Input name="income" value={d.income} placeholder="Ingreso mensual" onChange={handleChange}/>

              <Select name="coverage" value={d.coverage} onChange={handleChange}>
                <option value="">Cobertura</option>
                <option>USD 50.000</option>
                <option>USD 100.000</option>
                <option>USD 200.000</option>
              </Select>
            </Grid>
          )}

          {/* VIAJE */}
          {form.insuranceType==='travel' && (
            <Grid>
              <Input name="destinations" value={d.destinations} placeholder="Destino(s)" onChange={handleChange}/>
              <Input type="date" name="startDate" value={d.startDate} onChange={handleChange}/>
              <Input type="date" name="endDate" value={d.endDate} onChange={handleChange}/>
              <Input name="travelers" value={d.travelers} placeholder="Cantidad viajeros" onChange={handleChange}/>
            </Grid>
          )}

          {/* DATOS PERSONALES */}
          <div style={{marginTop:20}}>
            <Input name="fullName" value={c.fullName} placeholder="Nombre completo" onChange={handleChange}/>
            <Grid>
              <Input name="email" value={c.email} placeholder="Email" onChange={handleChange}/>
              <Input name="phone" value={c.phone} placeholder="Celular" onChange={handleChange}/>
              <Input name="ci" value={c.ci} placeholder="Cédula" onChange={handleChange}/>
            </Grid>
          </div>

        </Content>

        <Footer>
          <Button onClick={handleSubmit} disabled={!isValid()}>
            Enviar solicitud
          </Button>
        </Footer>

      </Container>
    </Overlay>
  );
}