import './Loader.css'

const Loader = () => {
  return (
    <div className="loader-screen" role="status" aria-live="polite" aria-label="Loading">
      <div className="loader-wrapper">
        <div className="wave-loader">
          <span className="t">T</span>
          <span className="d">D</span>
          <span className="m">M</span>
        </div>
        <div className="infra-text">INFRA</div>
        <div className="loading-bar" />
      </div>
    </div>
  )
}

export default Loader
