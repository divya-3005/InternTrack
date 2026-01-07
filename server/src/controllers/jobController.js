const prisma = require('../prismaClient');


const getJobs = async (req, res) => {
  try {
    const jobs = await prisma.jobApplication.findMany({
      where: { userId: req.user.id },
      orderBy: { dateApplied: 'desc' },
    });
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createJob = async (req, res) => {
  const { company, position, status, location, salary, notes } = req.body;

  try {
    const job = await prisma.jobApplication.create({
      data: {
        company,
        position,
        status,
        location,
        salary,
        notes,
        userId: req.user.id,
      },
    });
    res.status(201).json(job);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateJob = async (req, res) => {
  const { id } = req.params;
  const { company, position, status, location, salary, notes } = req.body;

  try {
    const job = await prisma.jobApplication.findUnique({
      where: { id },
    });

    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    if (job.userId !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    const updatedJob = await prisma.jobApplication.update({
      where: { id },
      data: {
        company,
        position,
        status,
        location,
        salary,
        notes,
      },
    });
    res.json(updatedJob);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteJob = async (req, res) => {
  const { id } = req.params;

  try {
    const job = await prisma.jobApplication.findUnique({
      where: { id },
    });

    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    if (job.userId !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    await prisma.jobApplication.delete({
      where: { id },
    });
    res.json({ message: 'Job removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getJobs, createJob, updateJob, deleteJob };
