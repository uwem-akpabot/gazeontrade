import { Link } from 'react-router-dom';
import banner2 from './../../../assets/img/banner2.jpg';

const Breadcrumb = (props) => {
  return (
      <section className="breadcrumb-section set-bg" style={{ backgroundImage: `url(${banner2})` }}>
        <div className="container">
            <div className="row">
                <div className="col-lg-12 text-center">
                    <div className="breadcrumb__text">
                        <h2 className="text-dark">{props.pg}</h2>

                        <div className="breadcrumb__option">
                            <Link to="/">Home</Link>

                            <Link to={props.b4_link}>{props.b4}</Link>
                            
                            <span>{props.pg}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}
export default Breadcrumb;