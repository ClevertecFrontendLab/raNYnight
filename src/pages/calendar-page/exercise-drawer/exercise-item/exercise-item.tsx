import { Input, InputNumber } from 'antd';
import './exercise-item.less';
import { FC } from 'react';
import { Exercise } from 'src/types/trainings';

interface ExerciseItemProps {
    exercise: Exercise;
}

const ExerciseItem: FC<ExerciseItemProps> = ({ exercise }) => {
    return (
        <section className='exercise-item'>
            <Input
                name='name'
                placeholder='Упражнение'
                value={exercise.name}
                // onChange={(e) => handleInputChange(index, 'name', e.target.value)}
            />
            <div className='exercise-header'>
                <div className='exercise-input-text'>Подходы</div>
                <div className='exercise-input-text'>Вес, кг</div>
                <div className='exercise-input-text'>Количество</div>
            </div>
            <div className={'exercise-inputs-wrapper'}>
                <div className='exercise-input'>
                    <InputNumber
                        name='replays'
                        addonBefore='+'
                        value={exercise.replays !== null ? exercise.replays : 1}
                        // onChange={(value) =>
                        //     handleInputChange(index, 'replays', value !== null ? value : 1)
                        // }
                    />
                </div>
                <div className='exercise-input'>
                    <InputNumber
                        name='weight'
                        value={exercise.weight !== null ? exercise.weight : 0}
                        // onChange={(value) =>
                        //     handleInputChange(index, 'weight', value !== null ? value : 0)
                        // }
                    />
                </div>
                x
                <div className='exercise-input'>
                    <InputNumber
                        name='approaches'
                        value={exercise.approaches !== null ? exercise.approaches : 1}
                        // onChange={(value) =>
                        //     handleInputChange(index, 'approaches', value !== null ? value : 1)
                        // }
                    />
                </div>
            </div>
        </section>
    );
};

export default ExerciseItem;
