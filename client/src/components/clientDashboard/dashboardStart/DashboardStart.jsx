import React from "react";

export const DashboardStart = () => {
  return (
    <section>
      <section className="row d-flex justify-content-center align-items-center mx-auto">
        <h3 className="text-start">Quick actions</h3>
        <div className="col-sm-12 col-md-6 col-lg-4 justify-content-center align-items-center">
          <article className="card">
            <div className="card-body">
              <h3 className="card-title">Followers</h3>
            </div>
          </article>
        </div>
        <div className="col-sm-12 col-md-6 col-lg-4 justify-content-center align-items-center">
          <article className="card">
            <div className="card-body">
              <h3 className="card-title">Plan</h3>
            </div>
          </article>
        </div>
        <div className="col-sm-12 col-md-6 col-lg-4 justify-content-center align-items-center">
          <article className="card">
            <div className="card-body">
              <h3 className="card-title">Income</h3>
            </div>
          </article>
        </div>
      </section>
    </section>
  );
};
