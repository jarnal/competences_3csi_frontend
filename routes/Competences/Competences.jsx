import React from 'react'
import ListCompetences from './ListCompetences.jsx'

class Competences extends React.Component {
    render() {
        return (
            <div className="content-wrapper">
                <section className="content-header">
                    <h1>
                        Gestionnaire de compétences
                        <small>Toutes les compétences par section</small>
                        <div className="form-group col-md-2 col-xs-12 col-lg-2 pull-right">
                            <select className="form-control select2" style={{width: '100%'}}>
                                <option>3CSI</option>
                                <option>MS2I</option>
                                <option>SN</option>
                            </select>
                        </div>{/* /.form-group */}
                    </h1>
                </section>
                <section className="content" style={{ minHeight: 550 }}>
                    <div className="row">
                        <div className="col-xs-12">

                            {/* Left col */}
                            <section className="col-lg-12 connectedSortable">
                                {/* Listes Competences */}
                                <div className="box box-primary">
                                    <div className="box-header with-border">
                                        <h3 className="box-title">Choix dun groupe de compétences</h3>
                                        <div className="col-md-3 col-xs-3 col-lg-3 pull-right">
                                        </div>
                                    </div>
                                    {/* /.box-header */}
                                    <div className="box-body">
                                        <div className="row">
                                            <ListCompetences addCompetence={true}/>
                                        </div>
                                        {/* /.row */}
                                    </div>
                                    {/* /.box-body */}
                                    <div className="box-footer clearfix no-border">
                                        <button className="btn btn-default col-md-12 col-xs-12">Ajouter une compétence</button>
                                    </div>
                                </div>
                                {/* /.box */}
                            </section>
                            {/* /.Left col */}
                        </div>{/* /.row (main row) */}
                    </div>
                </section>
            </div>
        )
    }
}

module.exports = Competences
