export default function Home() {
  return (
    <>
      <header className="header-global">
        <nav id="navbar-main" className="navbar d-flex flex-row align-items-center navbar-main navbar-expand-lg navbar-dark justify-content-between">
          <ul className="navbar-nav navbar-nav-hover flex-row align-items-center">
            <li className="nav-item">
              <a href="#" className="nav-link" role="button">
                <span className="nav-link-inner-text">📺 Start</span>
              </a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link" role="button">
                <span className="nav-link-inner-text">📕 Docs</span>
              </a>
            </li>
          </ul>
          <div className="time text-center">
            <span className="time text-uppercase">1:47 PM</span>
          </div>
        </nav>
      </header>

      <main>
        <section className="section section-lg bg-secondary overflow-hidden z-2">
          <div className="container z-2">
            <div className="row justify-content-center pt-6 pt-md-5 pb-0 mb-2">
              <div className="col-12 col-xl-7">
                <div className="card card-tertiary">
                  <div className="card-header text-center">
                    <span>Windows 95 UI Kit Demo</span>
                  </div>
                  <div className="card-body">
                    <p className="card-text">
                      Welcome to the retro Windows 95 UI Kit! This is a free UI Kit that brings back
                      the nostalgia of the 90s with authentic Windows 95 components built on Bootstrap 4.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section-sm">
          <div className="container">
            <div className="row mt-5 mt-lg-2">
              <div className="col-lg-12">
                <h4 className="mb-5">Buttons</h4>
                <button className="btn mr-2 mb-2 btn-primary" type="button">
                  <span className="btn-text">Primary</span>
                </button>
                <button className="btn mr-2 mb-2 btn-primary border-dark" type="button">
                  <span className="btn-text">Bordered</span>
                </button>
                <button className="btn mr-2 mb-2 btn-secondary" type="button">
                  <span className="btn-text">Secondary</span>
                </button>
                <button className="btn mr-2 mb-2 btn-success" type="button">
                  <span className="btn-text">Success</span>
                </button>
                <button className="btn mr-2 mb-2 btn-warning" type="button">
                  <span className="btn-text">Warning</span>
                </button>
                <button className="btn mr-2 mb-2 btn-danger" type="button">
                  <span className="btn-text">Danger</span>
                </button>

                <h6 className="text-gray my-5">Icon Buttons</h6>
                <div className="d-flex align-items-center flex-wrap">
                  <button className="btn mr-2 mb-2 btn-primary" type="button">
                    <span className="btn-text">💾 Save</span>
                  </button>
                  <button className="btn mr-2 mb-2 btn-primary" type="button">
                    <span className="btn-text">🖨 Print</span>
                  </button>
                  <button className="btn mr-2 mb-2 btn-primary" type="button">
                    <span className="btn-text">💿 Disk</span>
                  </button>
                  <button className="btn mr-2 mb-2 btn-primary" type="button">
                    <span className="btn-text">📺 Help</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section-sm bg-secondary">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <h4 className="text-white mb-5">Cards</h4>
              </div>
              <div className="col-12 col-lg-6 mb-4">
                <div className="card">
                  <div className="card-header">
                    Primary Card
                  </div>
                  <div className="card-body">
                    <p className="card-text">
                      Windows 95 was released on August 24, 1995. It featured a brand new user interface
                      with the Start menu and taskbar.
                    </p>
                    <div className="d-flex justify-content-end mt-3">
                      <button className="btn btn-sm mr-2 btn-primary border-dark" type="button">
                        <span className="btn-text">OK</span>
                      </button>
                      <button className="btn btn-sm btn-primary" type="button">
                        <span className="btn-text">Cancel</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 col-lg-6 mb-4">
                <div className="card card-tertiary">
                  <div className="card-header">
                    <span>Tertiary Card</span>
                  </div>
                  <div className="card-body">
                    <p className="card-text">
                      The operating system came on either floppy disks (13 disks!) or a CD-ROM.
                      It required a 386DX processor and at least 4MB of RAM.
                    </p>
                    <div className="d-flex mt-3">
                      <button className="btn btn-sm mr-2 btn-primary border-dark" type="button">
                        <span className="btn-text">OK</span>
                      </button>
                      <button className="btn btn-sm btn-primary" type="button">
                        <span className="btn-text">Cancel</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section-sm">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <h4 className="mb-5">Forms</h4>
                <div className="row">
                  <div className="col-12 col-lg-6">
                    <div className="form-group d-flex align-items-center justify-content-between">
                      <label htmlFor="username" className="mr-3">Username:</label>
                      <input id="username" type="text" className="form-control w-75" />
                    </div>
                    <div className="form-group d-flex align-items-center justify-content-between">
                      <label htmlFor="password" className="mr-3">Password:</label>
                      <input id="password" type="password" className="form-control w-75" />
                    </div>
                    <div className="form-group d-flex justify-content-end mb-4">
                      <div className="form-check">
                        <label className="form-check-label">
                          <input className="form-check-input" type="checkbox" />
                          <span className="form-check-x"></span>
                          <span className="form-check-sign"></span>
                          Remember me
                        </label>
                      </div>
                    </div>
                    <div className="d-flex justify-content-end">
                      <button className="btn btn-sm mr-3 btn-primary border-dark" type="button">
                        <span className="btn-text">Login</span>
                      </button>
                      <button className="btn btn-sm btn-primary" type="button">
                        <span className="btn-text">Cancel</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <nav className="navbar navbar-main navbar-expand-lg navbar-dark justify-content-between navbar-footer">
          <ul className="navbar-nav navbar-nav-hover flex-row align-items-center">
            <li className="nav-item">
              <a href="#" className="nav-link" role="button">
                <span className="nav-link-inner-text">📺 Start</span>
              </a>
            </li>
          </ul>
          <div className="time text-center">
            <span className="time text-uppercase">1:47 PM</span>
          </div>
        </nav>
      </footer>
    </>
  );
}
