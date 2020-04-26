import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Backbutton from '../../components/backbutton/backbutton';
import BasicInfo from './basicinfo';
import Button from '@material-ui/core/Button';
import FindOnMap from './findonmap';
import LogInfo from './loginfo';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';
import Typography from '@material-ui/core/Typography';
import {Link} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    stepper:{
        backgroundColor:'transparent',
    },
    step: {
        width:"14vw"
    }
    ,button: {
        marginRight: theme.spacing(1),
    },
    backButton: {
        marginRight: theme.spacing(1),
    },
    completed: {
        display:'flex',
        justifyContent:'center'
    },
    instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
    formController: {
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center',
        margin:'4vh'
    }
}));

function getSteps() {
    return ['Basic Info', 'Location', 'Credentials'];
}

function getStepContent(step) {
    switch (step) {
        case 0:
            return <BasicInfo/>;
        case 1:
            return <FindOnMap/>;
        case 2:
            return <LogInfo/>;
        default:
            return 'Unknown step';
    }
}

export default function AddMarket() {
    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);
    const [completed, setCompleted] = React.useState(new Set());
    const [skipped] = React.useState(new Set());
    const steps = getSteps();

    const totalSteps = () => {
    return getSteps().length;
  };
    const skippedSteps = () => {
        return skipped.size;
    };

    const completedSteps = () => {
        return completed.size;
    };

    const allStepsCompleted = () => {
        return completedSteps() === totalSteps() - skippedSteps();
    };

    const isLastStep = () => {
        return activeStep === totalSteps() - 1;
    };

    const handleNext = () => {
        const newActiveStep =
            isLastStep() && !allStepsCompleted()
            ?   steps.findIndex((step, i) => !completed.has(i))
            :   activeStep + 1;
        setActiveStep(newActiveStep);
    };

    const handleStep = (step) => () => {
        setActiveStep(step);
    };

    const handleComplete = () => {
        const newCompleted = new Set(completed);
        newCompleted.add(activeStep);
        setCompleted(newCompleted);
        if (completed.size !== totalSteps() - skippedSteps()) {
            handleNext();
        }
    };

    const isStepSkipped = (step) => {
        return skipped.has(step);
    };

    function isStepComplete(step) {
        return completed.has(step);
    }

    return (
        <div className="SecondaryPage">
            <Backbutton />
            <form className="FormWrapper">
                <h2> Sign Up, level up your grocery store today </h2>
                <Stepper className={classes.stepper} alternativeLabel nonLinear activeStep={activeStep}>
                    {steps.map((label, index) => {
                        const stepProps = {};
                        const buttonProps = {};
                        if (isStepSkipped(index))
                            stepProps.completed = false;
                        return (
                            <Step key={label} {...stepProps} className={classes.step}>
                                <StepButton
                                onClick={handleStep(index)}
                                completed={isStepComplete(index)}
                                {...buttonProps}>
                                    {label}
                                </StepButton>
                            </Step>);
                    })}
                </Stepper>
                {allStepsCompleted()
                    ?   (<div className={classes.formController}>
                            <h3>
                                You have signed up, you can login in the platform right now!
                            </h3>
                            <Link to="/login">
                            <Button style={{marginTop:'20px'}} color="primary">
                                Log in
                            </Button>
                            </Link>
                        </div>)
                    :   (<div>
                            {getStepContent(activeStep)}
                            <div className={classes.formController}>
                                {activeStep !== steps.length &&
                                (completed.has(activeStep)
                                ?   (<Typography variant="caption" className={classes.completed}>
                                        Το βήμα {activeStep + 1} έχει ολοκληρωθεί
                                    </Typography>)
                                :   (<Button color="primary" onClick={handleComplete}>
                                        {completedSteps() === totalSteps() - 1 ? 'Final Step' : 'Next Step'}
                                    </Button>))}
                            </div>
                        </div>)
                }
            </form>
        </div>
    );
}
