/* eslint-disable @typescript-eslint/no-unused-vars */
import QueryBuilder from '../../builder/QueryBuilder';
import { comitteeSearch } from './committee.constant';
import { TCommitte } from './committee.interface';
import { Committe } from './committee.model';

const createCommittee = async (payload: TCommitte) => {
  const result = await Committe.create(payload);
  return result;
};

const getAllCommittee = async (query: Record<string, unknown>) => {
  const committeeQuery = new QueryBuilder(Committe.find(), query)
    .search(comitteeSearch)
    .filter()
    .sort()
    .paginate()
    .fields();

  const meta = await committeeQuery.countTotal();
  const committees = await committeeQuery.modelQuery;

  return {
    meta,
    committees,
  };
};
const getSinigleCommittee = async (id: string) => {
  const result = await Committe.findById(id);
  return result;
};
const updateCommittee = async (id: string, payload: Partial<TCommitte>) => {
  const result = await Committe.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deleteCommittee = async (id: string) => {
  const result = await Committe.deleteOne({ _id: id });
  return result;
};

export const committeeServices = {
  createCommittee,
  getAllCommittee,
  getSinigleCommittee,
  updateCommittee,
  deleteCommittee,
};
