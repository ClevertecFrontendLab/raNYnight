import { FC, useCallback, useState } from 'react';
import { exercisesTitles } from '@constants/trainings';
import { Checkbox, Input } from 'antd';
import { Exercise } from 'src/types/trainings';

import './exercise-item.less';
import { DATA_TEST_ID } from '@constants/data-test-id';

interface ExerciseItemProps {
    exercise: Exercise;
    index: number;
    onExerciseChange: (exercise: Exercise) => void;
}

const ExerciseItem: FC<ExerciseItemProps> = ({ exercise, onExerciseChange, index }) => {
    const { exerciseApproaches, exerciseReplays, exerciseName, exerciseWeigth } = exercisesTitles;

    const [exerciseState, setExerciseState] = useState<Exercise>(exercise);

    const handleInputChange = async (name: string, value: string | number | boolean) => {
        setExerciseState((prevExercise) => {
            onExerciseChange({
                ...prevExercise,
                [name!]: value,
                index,
            });
            return {
                ...prevExercise,
                [name!]: value,
                index,
            };
        });
    };

    return (
        <section className='exercise-item'>
            <Input
                autoFocus={true}
                name='name'
                placeholder={exerciseName}
                value={exerciseState.name}
                addonAfter={
                    <Checkbox
                        autoFocus={false}
                        id='selected'
                        name='selected'
                        checked={exerciseState.selected}
                        onChange={(e) => handleInputChange(e.target.name!, e.target.checked)}
                        data-test-id={`${DATA_TEST_ID.modalDrawerRightCheckboxExercise}${index}`}
                    />
                }
                onChange={async (e) => await handleInputChange(e.target.name, e.target.value)}
                data-test-id={`${DATA_TEST_ID.modalDrawerRightInputExercise}${index}`}
            />
            <div className='exercise-header'>
                <div className='exercise-input-text'>{exerciseReplays}</div>
                <div className='exercise-input-text'>{exerciseWeigth}, кг</div>
                <div className='exercise-input-text'>{exerciseApproaches}</div>
            </div>
            <div className={'exercise-inputs-wrapper'}>
                <div className='exercise-input'>
                    <Input
                        autoFocus={false}
                        type='number'
                        name='replays'
                        addonBefore='+'
                        value={exerciseState.replays}
                        onChange={async (e) =>
                            await handleInputChange(e.target.name, e.target.value)
                        }
                        data-test-id={`${DATA_TEST_ID.modalDrawerRightInputApproach}${index}`}
                    />
                </div>
                <div className='exercise-input'>
                    <Input
                        autoFocus={false}
                        type='number'
                        name='weight'
                        value={exerciseState.weight}
                        data-test-id={`${DATA_TEST_ID.modalDrawerRightInputWeight}${index}`}
                        onChange={async (e) =>
                            await handleInputChange(e.target.name, e.target.value)
                        }
                    />
                </div>
                x
                <div className='exercise-input'>
                    <Input
                        autoFocus={false}
                        type='number'
                        name='approaches'
                        value={exerciseState.approaches}
                        onChange={async (e) =>
                            await handleInputChange(e.target.name, e.target.value)
                        }
                        data-test-id={`${DATA_TEST_ID.modalDrawerRightInputQuantity}${index}`}
                    />
                </div>
            </div>
        </section>
    );
};

export default ExerciseItem;
