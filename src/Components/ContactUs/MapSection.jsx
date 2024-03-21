import { Col } from 'reactstrap';
import WrapperComponent from '../Common/WrapperComponent';

const MapSection = () => {
  return (
    <Col lg={6}>
      <WrapperComponent classes={{ sectionClass: 'map-section', fluidClass: 'p-0' }} noRowCol={true}>
        <div className="map-box">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1912.088778053428!2d99.92073279790237!3d8.44333955951166!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x305300b51adb3a39%3A0xce1e6a104a824de2!2z4Lij4LmJ4Liy4LiZ4LmB4Lih4LmI4Lib4Li44LmL4Lii!5e0!3m2!1sth!2sth!4v1709986612476!5m2!1sth!2sth"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </WrapperComponent>
    </Col>
  );
};

export default MapSection;
